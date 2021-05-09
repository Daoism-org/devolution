// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./IERC20.sol";

/**
 * @author
 * @notice
 */
interface IRepToken is IERC20 {
    function mint(address _to, uint256 _amount) external;
}