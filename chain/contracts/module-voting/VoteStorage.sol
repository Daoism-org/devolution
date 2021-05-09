// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../base-implementations/modules/BaseSubModule.sol";
import "./VotingCoordinator.sol";

contract VoteStorage is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "VoteStorage";

    VotingCoordinator internal voteCoImp_; 
    // Needed information to count ballots for an election
    struct BallotCount {
        uint256 tally;
        uint256 weight;
    }
    // Needed information for each proposal election
    struct ProposalElection {
        uint256 expiry;
        BallotCount votesFor;
        BallotCount votesAgainst;
        bool executedOrDismissed;
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
    // MODIFIERS

    modifier onlyApprovedModifiers() {
        require(
            voteCoImp_.isValidStateModifier(msg.sender),
            "Sender not valid state modifier"
        );
        _;
    }

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    /**
     * @param   _baseModule Address of the voter coordinator.
     */
    constructor(address _baseModule) 
        BaseSubModule(SubModuleIdentifier_, _baseModule)
    {
        voteCoImp_ = VotingCoordinator(_baseModule);
    }

    function init() external override {
        // module which is turn getting it from the spoke dao.
    }


    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

        /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  tallyVotesFor The total votes for.
     * @return  tallyWeightFor The weight of all votes for.
     * @return  tallyVotesAgainst The total votes against.
     * @return  tallyWeightAgainst The weight of all votes against.
     */
    function getProposalElectionResults(
        uint256 _propID
    ) 
        external 
        view 
        returns(
            uint256 tallyVotesFor,
            uint256 tallyWeightFor,
            uint256 tallyVotesAgainst,
            uint256 tallyWeightAgainst
        ) 
    {
        // For
        tallyVotesFor = elections_[_propID].votesFor.tally;
        tallyWeightFor = elections_[_propID].votesFor.weight;
        // Against
        tallyVotesAgainst = elections_[_propID].votesAgainst.tally;
        tallyWeightAgainst = elections_[_propID].votesAgainst.weight;
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  uint256 Expiry time stamp of the proposal
     */
    function getProposalExpiry(uint256 _propID) external view returns(uint256) {
        return elections_[_propID].expiry;
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  uint256 Expiry time stamp of the proposal
     */
    function isProposalInVoteWindow(
        uint256 _propID
    ) 
        external 
        view 
        returns(bool) 
    {
        if(elections_[_propID].expiry < block.timestamp) {
            return false;
        }
        return true;
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  totalVotes Total votes cast (so far) for this election.
     * @return  totalWeight Total weight voted with (so far) for this election.
     */
    function getProposalElectionTotals(
        uint256 _propID
    ) 
        external 
        view 
        returns(
            uint256 totalVotes,
            uint256 totalWeight
        )
    {
        totalVotes = elections_[_propID].votesFor.tally + 
            elections_[_propID].votesAgainst.tally;
        totalWeight = elections_[_propID].votesFor.weight +
            elections_[_propID].votesAgainst.weight;
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  bool If the proposal has been executed or dismissed.
     */
    function isProposalExecutedOrDismissed(
        uint256 _propID
    )  
        external 
        view 
        returns(bool)
    {
        return elections_[_propID].executedOrDismissed;
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function registerOptionsOnModule() external override {

    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @param   _expiry The expiry for the proposal election.
     * @notice  This function will fail if a non-approved address calls it.
     */
    function setElectionExpiry(
        uint256 _propID,
        uint256 _expiry
    ) 
        external
        onlyApprovedModifiers()
    {
        elections_[_propID].expiry = _expiry;
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @notice  This function will fail if a non-approved address calls it.
     */
    function setProposalExecutedOrDismissed(
        uint256 _propID
    ) 
        external 
        onlyApprovedModifiers()
    {
        elections_[_propID].executedOrDismissed = true;
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @param   _voterID The NFT ID of the voter.
     * @param   _voteWeight The weight of the cast vote.
     * @param   _vote If the vote is for (true) or against (false) the proposal.
     * @notice  This function will fail if a non-approved address calls it.
     *          This function will revert if the `_voterID` has already voted.
     */
    function castVote(
        uint256 _propID,
        uint256 _voterID,
        uint256 _voteWeight,
        bool _vote 
    ) 
        external
        onlyApprovedModifiers()
    {
        require(
            voterRegistry_[_propID][_voterID].hasVoted == false,
            "Vote already cast"
        );
        // Storing the users vote
        voterRegistry_[_propID][_voterID].vote = _vote;
        if(_vote) {
            elections_[_propID].votesFor.tally += 1;
            elections_[_propID].votesFor.weight += _voteWeight;
        } else {
            elections_[_propID].votesAgainst.tally += 1;
            elections_[_propID].votesAgainst.weight += _voteWeight;
        }
        voterRegistry_[_propID][_voterID].hasVoted = true;
    }
}