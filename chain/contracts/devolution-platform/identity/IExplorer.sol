// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "./IERC721.sol";

interface IExplorer is IERC721 {
    function isExplorer(address _explorer) external view returns(bool);
    function getOwnerToken(address _owner) external view returns(uint256);
    function getJoinedSpokes(address _voter) external view returns(address[] memory);

    function mint(address _to) external returns(uint256);
    function joinSpokeDao(address _voterID, address _spokeDao) external;
}