// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IOptionsRegistry {
    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getModuleOptions(
        bytes32 _moduleIdentifier
    ) 
        external 
        view 
        returns(bytes32[] memory);

    function getOptionInformation(bytes32 _identifier) external view returns(
        string memory requiredData
    );

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function registerOptionsOnModule(
        bytes32 _moduleIdentifier,
        bytes4 _functionSignature,
        string calldata _requiredData
    ) external returns(bytes32 optionID);
}