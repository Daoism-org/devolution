// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

/**
 * @author
 * @notice
 */
interface IPropStorage {    

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getProposalInfo(uint256 _propID) external view returns(
        bytes32 optionIdentifier,
        bytes memory parameters,
        uint256 expiryTimestamp,
        address proposer
    );

    // -------------------------------------------------------------------------
    // ONLY VOTING BOOTH STATE MODIFYING FUNCTIONS

    function createProposal(
        bytes32 _optionIdentifier,
        bytes calldata _parameters,
        uint256 _expiryTimestamp,
        address _proposer
    ) 
        external 
        returns(uint256 propID);
    
}