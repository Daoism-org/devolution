// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./VoteStorage.sol";
import "./VotingCoordinator.sol";
import "./proposals/IPropStorage.sol";
import "../module-reputation/IVoteWeight.sol";
import "../devolution-platform/identity/IExplorer.sol";
import "../base-implementations/modules/BaseSubModule.sol";

contract VotingBooth is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "VotingBooth";
    // NOTES
    VotingCoordinator internal voteCoImp_; 
    // Needed information to count ballots for an election
    struct BallotCount {
        uint256 tally;
        uint256 weight;
        uint256 uniqueVoters;
    }
    // Needed information for each proposal election
    struct ProposalElection {
        uint256 expiry;
        BallotCount votesFor;
        BallotCount votesAgainst;
    }
    // Proposal ID => Proposal Election Information
    mapping(uint256 => ProposalElection) internal elections_;
    struct Voting {
        bool hasVoted;
        bool vote;
    }
    // Proposal ID => Voter (NFT ID) => Vote
    mapping(uint256 => mapping(uint256 => Voting)) internal voterRegistry_;

    // -------------------------------------------------------------------------
    // EVENTS

    event ProposalElectionRegistered(
        uint256 proposalID,
        uint256 expiryTimestamp
    );

    event BallotCast(
        uint256 proposalID,
        uint256 voterID,
        bool votePosition
    );

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(address _baseModule) 
        BaseSubModule(SubModuleIdentifier_, _baseModule)
    {
        voteCoImp_ = VotingCoordinator(_baseModule);
    }

    function init() external override {
        // module which is turn getting it from the spoke dao.
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS


    function registerOptionsOnModule() external override {

    }

    /**
     * @param   _optionID The ID of the option being registered.
     * @param   _executionParameters The encoded execution parameters for the 
     *          option proposal.
     * @param   _expiryTimestamp Timestamp for the expiration of this election.
     * @notice  This function will revert if the given proposal ID has already
     *          been registered. 
     *          This function will revert if the given expiry time is zero or is
     *          in the past (before current time).
     */
    function registerElection(
        bytes32 _optionID,
        bytes calldata _executionParameters,
        uint256 _expiryTimestamp
    ) 
        external 
    {
        IPropStorage propStorage = IPropStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.ProposalStorage
            )
        );

        VoteStorage voteStorage = VoteStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VoteStorage
            )
        );

        uint256 propID = propStorage.createProposal(
            _optionID,
            _executionParameters,
            _expiryTimestamp,
            msg.sender
        );

        uint256 currentExpiry = voteStorage.getProposalExpiry(propID);

        require(
            currentExpiry == 0,
            "Prop ID already exists"
        );
        // FUTURE removed this for ease of basic deployment
        // require(
        //     _expiryTimestamp != 0 && 
        //     _expiryTimestamp >= block.timestamp,
        //     "Given expiry time invalid"
        // );

        voteStorage.setElectionExpiry(propID, _expiryTimestamp);

        emit ProposalElectionRegistered(
            propID,
            _expiryTimestamp
        );
    }

    /**
     * @param   _propID ID of the prop that is being voted on.
     * @param   _vote The users vote for (true) or against (false) the 
     *          proposal. TODO M better name?
     * @notice  This function will revert if the proposal has expired, or if 
     *          the election for the proposal has not been registered. 
     *          TODO This function will revert if the `_voterID` is not a valid
     *          and registered ID on this DAO.
     *          This function will revert if the 
     */
    function castBinaryVote(
        uint256 _propID, 
        bool _vote
    ) external {
        // FUTURE removed for ease of testing/demo
        // require(
        //     _isValidProposal(_propID),
        //     "prop expired or non-existant"
        // );

        IVoteWeight voteWeightInstance = IVoteWeight(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VotingWeight
            )
        );

        VoteStorage voteStorage = VoteStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VoteStorage
            )
        );

        uint256 voterID = IExplorer(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.DevolutionSystemIdentity
            )
        ).getOwnerToken(msg.sender);

        // Will revert if voter does not own Explorer token
        uint256 voteWeight = voteWeightInstance.getVoterWeight(msg.sender);

        voteStorage.castVote(_propID, voterID, voteWeight, _vote);

        emit BallotCast(
            _propID,
            voterID,
            _vote
        );
    }

    /**
     * @param   _propID The ID of the proposal being checked.
     * @return  bool If the proposal has been registered and is within voting
     *          period.
     */
    function _isValidProposal(uint256 _propID) internal view returns(bool) {
        VoteStorage voteStorage = VoteStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VoteStorage
            )
        );
        
        uint256 currentExpiry = voteStorage.getProposalExpiry(_propID);

        if(currentExpiry == 0) {
            return false;
        } else if(voteStorage.isProposalInVoteWindow(_propID)) {
            return false;
        }
        return true;
    }
}