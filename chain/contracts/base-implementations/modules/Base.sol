// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./IBaseModule.sol";
import "../spoke/BaseDao.sol";
import "../spoke/BaseDaoLibrary.sol";
import "../../module-voting/options/IOptionsRegistry.sol";

/**
 * @author
 * @notice  This contract needs to be inherited into any module that needs high
 *          level access to the spoke DAO. 
 */
abstract contract Base {
    // Identifier for the module
    bytes32 public immutable ModuleIdentifier;
    // Storage of the deployer for once off access
    address internal deployer_;
    //
    bool public isSubModule;
    // 
    IBaseModule internal baseModule_; 
    // Instance of spoke DAO
    BaseDao internal spokeDaoInstance_;
    // If this Base DAO has been initialised
    bool internal alive_;
    // State of the deployment & registering process
    enum StateSetup { NOT_DEPLOYED, REGISTERING, COMPLETE }
    StateSetup internal stateSetup;

    // -------------------------------------------------------------------------
    // EVENTS

    event OptionRegistered(
        bytes32 optionID,
        bytes32 moduleIdentifier,
        address moduleImplementation,
        bytes4 functionSignature,
        string requiredData
    );

    // -------------------------------------------------------------------------
    // MODIFIERS

    modifier onlyExecutor() {
        require(
            msg.sender == spokeDaoInstance_.getModuleAddress(
                BaseDaoLibrary.OptionsExecutor
            ),
            "Only executor may call"
        );
        _;
    }

    modifier onlySetUpOrExecutor() {
        require(
            msg.sender == spokeDaoInstance_.getModuleAddress(
                BaseDaoLibrary.OptionsExecutor
            ) || msg.sender == deployer_,
            "Only executor may call"
        );
        _;
    }

    modifier isActive() {
        require(
            alive_ && stateSetup == StateSetup.COMPLETE,
            "Base DAO not initialised"
        );
        _;
    }

    modifier onlySpoke() {
        require(
            msg.sender == address(spokeDaoInstance_),
            "Only Base DAO access"
        );
        _;
    }

    modifier onlyModule(bytes32 _identifier) {
        require(
            msg.sender == this.getModuleFromBase(_identifier),
            "Only identified module"
        );
        _;
    }

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(
        bytes32 _moduleIdentifier, 
        address _spoke, 
        bool _isSubModule, 
        address _module
    ) {
        spokeDaoInstance_ = BaseDao(_spoke);
        ModuleIdentifier = _moduleIdentifier;
        stateSetup = StateSetup.REGISTERING;
        deployer_ = msg.sender;
        isSubModule = _isSubModule;

        if(isSubModule) {
            baseModule_ = IBaseModule(_module);
        }
    }

    function endSetUp() external {
        require(
            stateSetup == StateSetup.REGISTERING,
            "State not registering"
        );
        require(
            msg.sender == deployer_,
            "Only deployer"
        );

        stateSetup = StateSetup.COMPLETE;
        deployer_ = address(0);
    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getModuleIdentifier() external view returns(bytes32) {
        return ModuleIdentifier;
    }

    function getBaseDao() external view returns(address) {
        return address(spokeDaoInstance_);
    }

    function getModuleFromBase(
        bytes32 _identifier
    ) external view returns(address) {
        return spokeDaoInstance_.getModuleAddress(_identifier);
    }

    function getBytes32Of(string memory _identifier) external view returns(bytes32) {
        return bytes32(
            keccak256(
                abi.encodePacked(
                    _identifier
                )
            )
        );
    }

    function getCurrentTime() external view returns(uint256) {
        return block.timestamp;
    }


    // -------------------------------------------------------------------------
    // INTERNAL FUNCTIONS

    function _registerOption(
       bytes32 _moduleIdentifier,
        bytes4 _functionSignature,
        string calldata _requiredData
    ) internal {
        IOptionsRegistry optionsReg = IOptionsRegistry(this.getModuleFromBase(
            BaseDaoLibrary.OptionsRegistry
        ));

        bytes32 optionID = optionsReg.registerOptionsOnModule(
            _moduleIdentifier,
            _functionSignature,
            _requiredData
        );

        emit OptionRegistered(
            optionID,
            _moduleIdentifier,
            address(this),
            _functionSignature,
            _requiredData
        );
    }
}