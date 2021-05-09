// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../base-implementations/modules/BaseSubModule.sol";
import "./VotingCoordinator.sol";
import "./VoteStorage.sol";

contract GeneralCensus is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "GeneralCensus";
    // 
    VotingCoordinator internal voteCoImp_; 
    // Consensus parameters
    // The minimum number of votes cast for a vote to reach consensus
    uint256 public minimumVotes;
    // The minimum amount of weight behind votes for a vote to reach consensus
    uint256 public minimumWeight;

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    /**
     * @param   _baseModule Address of the voter coordinator.
     * @param   _minVotes The minimum number of votes needed for a proposal
     *          election to pass. 
     * @param   _minWeight The minimum needed weight for a proposal election to
     *          pass. 
     */
    constructor(
        address _baseModule,
        uint256 _minVotes,
        uint256 _minWeight
    ) BaseSubModule(SubModuleIdentifier_, _baseModule)
    {
        voteCoImp_ = VotingCoordinator(_baseModule);
        minimumVotes = _minVotes;
        minimumWeight = _minWeight;
    }

    function init() external override {

    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  consensusReached If a simple majority consensus has been 
     *          reached.
     * @return  isPassed If a simple majority consensus is for the proposal
     *          passing. 
     */
    function doesElectionReachConsensus(
        uint256 _propID
    ) 
        external
        view
        returns(
            bool consensusReached,
            bool isPassed
        ) 
    {
        // Checks the minimum engagement requirements are met
        if(!_minEngagementReached(_propID)) {
            return (false, false);
        }
        // Getting information for consensus
        (
            uint256 tallyVotesFor,
            uint256 tallyWeightFor,
            uint256 tallyVotesAgainst,
            uint256 tallyWeightAgainst
        ) = VoteStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VoteStorage
            )
        ).getProposalElectionResults(_propID);
        (
            bool votesReached, 
            bool voteIsFor
        ) = _simpleMajority(tallyVotesFor, tallyVotesAgainst);
        (
            bool weightReached, 
            bool weightIsFor
        ) = _simpleMajority(tallyVotesFor, tallyVotesAgainst);
        // Checks if a simple majority was reached for votes and weight
        if(
            votesReached == false ||
            weightReached == false
        ) {
            return (false, false);
        }
        // Checks if the vote passed for
        if(
            voteIsFor &&
            weightIsFor
        ) {
            return (true, true);
        }
        // Otherwise vote failed (is against)
        return (true, false);
    }

    // -------------------------------------------------------------------------
    // ONLY EXECUTOR MODIFYING FUNCTIONS

    function updateConsensusRequirements(
        uint256 _minVotes,
        uint256 _minWeight
    ) external onlyExecutor() {
        minimumVotes = _minVotes;
        minimumWeight = _minWeight;
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS


    function registerOptionsOnModule() external override {
        // TODO upgradeability for consensus mins
    }

    /**
     * @param   _propID The ID of the proposal election being executed.
     * @notice  This function will revert if the vote window for a proposal 
     *          has not passed. 
     *          This function will revert if the proposal has already been 
     *          executed or dismissed.
     */
    function executeProposal(uint256 _propID) external {
        VoteStorage voteStorage = VoteStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VoteStorage
            )
        );

        require(
           voteStorage.isProposalInVoteWindow(_propID) == false,
           "Cannot execute while vote open"
        );
        require(
            voteStorage.isProposalExecutedOrDismissed(_propID) == false,
           "Proposal executed or dismissed"
        );

        // Checking consensus was reached
        (
            bool consensusReached,
            bool isPassed
        ) = this.doesElectionReachConsensus(_propID);
        
        if(consensusReached && isPassed) {
            // Proposal reached consensus and passed
            // FIXME call options executor to execute
        } else {
            // Proposal did not reach consensus or did not pass
        }
        // Setting the proposal to executed or dismissed
        voteStorage.setProposalExecutedOrDismissed(_propID);
    }

    // -------------------------------------------------------------------------
    // INTERNAL FUNCTIONS

    /**
     * @param   _for Counter for the proposal.
     * @param   _against Counter against the proposal.
     * @return  majorityReached If a majority was reached.
     * @return  isFor If the majority is for the proposal to pass.
     */
    function _simpleMajority(
        uint256 _for, 
        uint256 _against
    ) 
        internal 
        pure
        returns(
            bool majorityReached,
            bool isFor
        ) 
    {
        if(_for > _against) {
            return(true, true);
        } else if(_against > _for) {
            return(true, false);
        }
        return (false, false);
    }

    /**
     * @param   _propID The ID of the proposal election being checked.
     * @return  bool Returns if the proposal reaches the minimum required 
     *          engagement in voters and total vote weight. 
     */
    function _minEngagementReached(uint256 _propID) internal view returns(bool) {
        (
            uint256 totalVotes,
            uint256 totalWeight
        ) = VoteStorage(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.VoteStorage
            )
        ).getProposalElectionTotals(_propID);

        if(
            totalVotes >= minimumVotes &&
            totalWeight >= minimumWeight
        ) {
            return true;
        }
        return false;
    }
}