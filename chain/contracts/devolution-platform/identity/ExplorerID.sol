pragma solidity 0.7.6;

import "./IERC721.sol";
import "../../base-implementations/modules/BaseModule.sol";

/**
 * @author  Veronica Coutts @Nicca42 (Github) @vonnie610 (twitter).
 * @notice  This contract conforms to the ERC721 interface, but not necessarily 
 *          the expected functionally. Please see function documentation for more
 *          information. 
 */
contract ExplorerID is IERC721 {
    // Identifier for the module
    bytes32 public immutable ModuleIdentifier;
    // NOTE
    address platformBase_;
    // Token name
    string internal name_;
    // Token symbol
    string internal symbol_;
    // Counter of all minted tokens
    uint256 internal totalSupply_;
    // Explorer address => Token ID
    mapping(address => uint256) internal explorersToIDs_;
    // Token ID => Explorer address
    mapping(uint256 => address) internal IDsToExplorers_;
    // Token Owner => Spender address => Approval status 
    mapping(address => mapping(address => bool)) internal operatorApprovals_;
    // Token ID => Spender address
    mapping(uint256 => address) internal approvedSpenders_;
    // Spoke DAOs
    mapping(uint256 => address[]) internal memberDaos_;


    // -------------------------------------------------------------------------
    // MODIFIERS

    modifier onlyBase() {
        require(
            msg.sender == platformBase_,
            "Only Base can access"
        );
        _;
    }


    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(address _base) 
    {
        name_ = "Explorer ID";
        symbol_ = "eID";
        platformBase_ = _base;
        ModuleIdentifier = BaseDaoLibrary.DevolutionSystemIdentity;
    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    /**
     * @return  string The name of the identity token.
     */
    function name() external view returns(string memory) {
        return name_;
    }

    /**
     * @return  string The symbol for the identity token.
     */
    function symbol() external view returns(string memory) {
        return symbol_;
    }

    /**
     * @return  The total number of tokens that have been minted.
     */
    function totalSupply() external view returns (uint256) {
        return totalSupply_;
    }

    /**
     * @param   _owner Address of explorer.
     * @return  tokenID The token ID.
     * @notice  This function does not conform to the expected functionality. 
     *          As one address can only ever own one token this function returns
     *          the `_owner`'s token ID.
     */
    function balanceOf(address _owner) external view override returns(uint256) {
        if(explorersToIDs_[_owner] == 0) {
            return 0;
        }
        return 1;
    }

    function getOwnerToken(address _owner) external view returns(uint256) {
        return explorersToIDs_[_owner];
    }

    function isExplorer(address _explorer) external view returns(bool) {
        if(explorersToIDs_[_explorer] != 0) {
            return true;
        }
    }

    /**
     * @param   _tokenID ID of the identity token.
     * @return  owner Address of the token owner.
     */
    function ownerOf(
        uint256 _tokenID
    ) 
        external 
        view 
        override
        returns(address owner) 
    {
        return IDsToExplorers_[_tokenID];
    }

    /**
     * @param   _tokenId ID of the identity token.
     * @return  operator Address of the approved operator.
     */
    function getApproved(
        uint256 _tokenId
    ) 
        external 
        view 
        override
        returns(address operator) 
    {
        return approvedSpenders_[_tokenId];
    }

    /**
     * @param   _owner Address of the token owner.
     * @param   _operator Address of the spender.
     * @notice  This function does not conform to the expected functionality.
     *          The spender will only ever have access to the one identity token
     *          the `_owner` owns. 
     */
    function isApprovedForAll(
        address _owner, 
        address _operator
    ) 
        external 
        view 
        override
        returns(bool)
    {
        return operatorApprovals_[_owner][_operator];
    }

    function getJoinedSpokes(address _voter) external view returns(address[] memory) {
        uint256 voterID = this.getOwnerToken(_voter);
        return memberDaos_[voterID];
    }

    function getAllSubModules() external view returns(bytes32[] memory) {
        bytes32[] memory empty;
        return empty;
    }

    function getModuleIdentifier() external view returns(bytes32) {
        return ModuleIdentifier;
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    /**
     * @param   _to The address being minted to.
     * @return  The token ID of the minted token.  
     */
    function mint(address _to) external onlyBase() returns(uint256) {
        totalSupply_ += 1;

        IDsToExplorers_[totalSupply_] = _to;
        explorersToIDs_[_to] = totalSupply_;

        emit Transfer(
            address(0), 
            _to, 
            totalSupply_
        );

        return totalSupply_;
    }

    function joinSpokeDao(address _voter, address _spokeDao) external onlyBase() {
        uint256 voterID = this.getOwnerToken(_voter);
        memberDaos_[voterID].push(_spokeDao);
    }

    /**
     * @param   _to The address being approved.
     * @param   _tokenId The token the `_to` is being approved as a spender of.
     * @notice  Approving multiple spenders with this function will result in
     *          the `getApproved()` function to only return the last approval. 
     *          Approvals however are not lost, but stored in the operator.
     *          Calling `isApprovedForAll()` will still reflect their approved
     *          status.
     */
    function approve(address _to, uint256 _tokenId) external override {
        address owner = this.ownerOf(_tokenId);

        require(
            owner != _to,
            "Can't approving current owner"
        );
        require(
            msg.sender == owner || this.isApprovedForAll(owner, msg.sender),
            "Sender is not owner or approved"
        );

        operatorApprovals_[owner][msg.sender] = true;
        approvedSpenders_[_tokenId] = msg.sender;
    }

    /**
     * @param   _operator Address of the operator.
     * @param   _approved Bool approval status of the `_operator`.
     * @notice  An address can only own one token at a time, so being approved
     *          for all or just approved are functionally exactly the same. 
     */
    function setApprovalForAll(address _operator, bool _approved) external override {
        require(
            msg.sender != _operator,
            "Can't approving current owner"
        );

        uint256 tokenID = this.balanceOf(msg.sender);

        operatorApprovals_[msg.sender][_operator] = _approved;
        approvedSpenders_[tokenID] = msg.sender;
    }

    /**
     * 
     */
    function transferFrom(
        address _from, 
        address _to, 
        uint256 _tokenID
    ) 
        external 
        override 
    {
        address owner = this.ownerOf(_tokenID);

        require(
            owner != _to,
            "Can't approving current owner"
        );
        require(_to != address(0), "Can't transfer to zero address");
        require(
            msg.sender == owner || this.isApprovedForAll(owner, msg.sender),
            "Sender is not owner or approved"
        );

        _transfer(
            _from, 
            _to, 
            _tokenID
        );
    }

    // -------------------------------------------------------------------------
    // INTERNAL FUNCTIONS

    function _transfer(
        address _from, 
        address _to, 
        uint256 _tokenID
    ) 
        internal
    {
        // Removing approval
        _approve(
            _from, 
            _to, 
            _tokenID, 
            false
        );

        explorersToIDs_[_from] = 0;
        explorersToIDs_[_to] = _tokenID;
        IDsToExplorers_[_tokenID] = _to;

        emit Transfer(_from, _to, _tokenID);
    }

    function _approve(
        address _from, 
        address _to, 
        uint256 _tokenID, 
        bool _approval
    ) internal {
        operatorApprovals_[_from][_to] = _approval;
        approvedSpenders_[_tokenID] = _to;

        emit Approval(this.ownerOf(_tokenID), _to, _tokenID);
    }
}