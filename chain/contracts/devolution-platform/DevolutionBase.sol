// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./identity/IExplorer.sol";

contract DevolutionBase {
    bytes32 public constant DaoIdentifier = "DevolutionDao";
    // Interface for identity solution
    IExplorer internal explorerID_;
    // Storage of the deployer for once off access
    address internal deployer_;
    // If this Base DAO has been initialised
    bool internal alive_;
    // Information about modules
    struct Dao {
        address implementation; 
        bool inUse;
    }
    // identifier of the module to its information
    mapping(address => Dao) internal daoRegistry_;
    //
    address[] internal allSpokeDaos_;

    // -------------------------------------------------------------------------
    // EVENTS

    event ExplorerJoined(address indexed explorer, uint256 explorerID);

    // -------------------------------------------------------------------------
    // MODIFIERS

    modifier onlyExecutor() {
        // TODO or execution address
        require(
            msg.sender == deployer_,
            "Only deployer can access"
        );
        _;
    }

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor() {
        deployer_ = msg.sender;
    }

    // -------------------------------------------------------------------------
    // NON-STATE MODIFYING FUNCTIONS

    function getModuleIdentifier() external view returns(bytes32) {
        return DaoIdentifier;
    }

    function isMember(address _explorer) external view returns(bool) {
        return explorerID_.isExplorer(_explorer);
    }

    function getBaseIdentityInstance() external view returns(address) {
        return address(explorerID_);
    }

    function getBaseExecutorInstance() external view returns(address) {
        return address(explorerID_);
    }

    function getAllSubModules() external view returns(bytes32[] memory) {
        bytes32[] memory empty;
        return empty;
    }

    function getAllSpokeDaos() external view returns(address[] memory) {
        return allSpokeDaos_;
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function addDao() external {
        daoRegistry_[msg.sender].implementation = msg.sender;
        daoRegistry_[msg.sender].inUse = true;
        allSpokeDaos_.push(msg.sender);
    }

    /**
     * @param   _explorerIdentityContract The address of the explorer identity 
     *          solution contract. It needs to conform to the interface contract
     *         `IExplorer`. 
     * @notice  Only the DAO executor contract or deployer address can call this
     *          function.
     */
    function addIdentityInstance(
        address _explorerIdentityContract
    ) 
        external 
        onlyExecutor() 
    {
        explorerID_ = IExplorer(_explorerIdentityContract);
    }

    /**
     * @return  uint256 The token ID for the minted identity token. 
     * @notice  This function will revert if the `addIdentityInstance` has not
     *          been initialised with a valid instance.
     * @dev     Emits the `ExplorerJoined` event. 
     */
    function joinDevolution() external returns(uint256) {
        uint256 explorerID = explorerID_.mint(msg.sender);

        require(
            explorerID != 0,
            "Explorer ID not initialises"
        );

        emit ExplorerJoined(msg.sender, explorerID);
    }

    function joinSpoke(address _voter) external {
        explorerID_.joinSpokeDao(_voter, msg.sender);
    }
}