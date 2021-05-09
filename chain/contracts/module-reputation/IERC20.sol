// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IERC20 {

    // -------------------------------------------------------------------------
    // EVENTS

    /**
     * @dev     Emitted when `value` tokens are moved from one account (`from`)
     *          to another (`to`).
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev     Emitted when the allowance of a `spender` for an `owner` is set
     *          by a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function allowance(address owner, address spender) external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function transfer(address recipient, uint256 amount) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
