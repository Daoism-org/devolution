// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../../base-implementations/modules/BaseSubModule.sol";

/**
 * @author
 * @notice
 */
contract ProposalStorage is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "ProposalStorage";
    // Counter for proposal IDs
    uint256 internal propCount_;
    //
    struct Proposal {
        bytes32 optionIdentifier;
        bytes executionParameters;
        uint256 expiry;
        address proposer;
    }
    // Storage of all props
    mapping(uint256 => Proposal) internal proposals_;


    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(address _baseModule) 
        BaseSubModule(SubModuleIdentifier_, _baseModule)
    {
        
    }

    function init() external override {
    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getProposalInfo(uint256 _propID) external view returns(
        bytes32 optionIdentifier,
        bytes memory parameters,
        uint256 expiryTimestamp,
        address proposer
    ) {
        optionIdentifier = proposals_[_propID].optionIdentifier;
        parameters = proposals_[_propID].executionParameters;
        expiryTimestamp = proposals_[_propID].expiry;
        proposer = proposals_[_propID].proposer;
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function registerOptionsOnModule() external override {

    }

    // -------------------------------------------------------------------------
    // ONLY VOTING BOOTH STATE MODIFYING FUNCTIONS

    function createProposal(
        bytes32 _optionIdentifier,
        bytes calldata _parameters,
        uint256 _expiryTimestamp,
        address _proposer
    ) 
        external 
        onlyModule(BaseDaoLibrary.VotingBooth) 
        returns(uint256)
    {
        propCount_ += 1;

        proposals_[propCount_].optionIdentifier = _optionIdentifier;
        proposals_[propCount_].executionParameters = _parameters;
        proposals_[propCount_].expiry = _expiryTimestamp;
        proposals_[propCount_].proposer = _proposer;

        return propCount_;
    }
}