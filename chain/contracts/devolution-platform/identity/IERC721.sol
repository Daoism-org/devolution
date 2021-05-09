// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

/**
 * @dev     Required interface of an ERC721 compliant contract.
 * @notice  The `ExplorerID` implementation conforms to the interface, but not
 *          necessarily the expected functionality. See the `ExplorerID` 
 *          implementation for detailed explanation.
 */
interface IERC721 {

    // -------------------------------------------------------------------------
    // EVENTS

    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function balanceOf(address _owner) external view returns (uint256);

    function ownerOf(uint256 _tokenId) external view returns (address owner);

    function isApprovedForAll(address _owner, address _operator) external view returns (bool);

    function getApproved(uint256 _tokenId) external view returns (address _operator);

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function approve(address _to, uint256 _tokenId) external;

    function transferFrom(address from, address _to, uint256 _tokenId) external;

    function setApprovalForAll(address _operator, bool _approved) external;
}
