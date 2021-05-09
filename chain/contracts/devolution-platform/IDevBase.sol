// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IDevBase {

    // -------------------------------------------------------------------------
    // NON-STATE MODIFYING FUNCTIONS

    function getModuleIdentifier() external view returns(bytes32);
    function isMember(address _explorer) external view returns(bool);
    function getBaseIdentityInstance() external view returns(address);
    function getAllSubModules() external view returns(bytes32[] memory);

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function addIdentityInstance(
        address _explorerIdentityContract
    ) 
        external;
    function addDao() external;
    function joinDevolution() external returns(uint256);
    function joinSpoke(address _voter) external;
}