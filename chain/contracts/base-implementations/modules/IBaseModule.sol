// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IBaseModule {

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getModuleIdentifier() external view returns(bytes32);

    function getBaseDao() external view returns(address);

    function getModuleFromBase(
        bytes32 _identifier
    ) external view returns(address);

    function getSubModuleImplementationAndUse(
        bytes32 _identifier
    ) external view returns(address, bool);

    function getSubModuleAddress(bytes32 _identifier) external view returns(address);
    
    function getAllSubModules() external view returns(bytes32[] memory);

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function init(
        bytes32[] memory _subModulesIdentifiers,
        address[] memory _subModulesInstances
    ) external;
}