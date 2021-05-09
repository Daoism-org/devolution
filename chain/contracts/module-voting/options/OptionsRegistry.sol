// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../../base-implementations/modules/BaseSubModule.sol";

// TODO options registration logic
contract OptionsRegistry is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "OptionsRegistry";
    // 
    struct Option {
        bytes32 moduleID;
        address module;
        bytes4 functionSignature;
        string requiredData;
        bool active;
    }
    // Option ID => Option information
    // Option ID = Hash of `BaseDaoLibrary_Identifier.functionSig` function sig is inputted as bytes4 
    mapping(bytes32 => Option) internal options_;
    //
    struct ModuleOptions {
        bytes32[] optionIDs;
    }
    // Module ID => The modules Options
    mapping(bytes32 => ModuleOptions) internal moduleOptions_;

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(address _baseModule) 
        BaseSubModule(SubModuleIdentifier_, _baseModule)
    {
        
    }

    function init() external override {
    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getModuleOptions(
        bytes32 _moduleIdentifier
    ) 
        external 
        view 
        returns(bytes32[] memory) 
    {
        return moduleOptions_[_moduleIdentifier].optionIDs;
    }

    function getOptionInformation(bytes32 _identifier) external view returns(
        string memory requiredData
    ) {
        options_[_identifier].requiredData;
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function registerOptionsOnModule() external override {

    }

    function registerOptionsOnModule(
        bytes32 _moduleIdentifier,
        bytes4 _functionSignature,
        string calldata _requiredData
    ) external returns(bytes32 optionID) {
        require(
            this.getModuleFromBase(_moduleIdentifier) == msg.sender,
            "Only module modify and options"
        );

        address moduleInstance = this.getModuleFromBase(_moduleIdentifier);

        optionID = bytes32(
            keccak256(
                abi.encodePacked(
                    _moduleIdentifier, 
                    _functionSignature
                )
            )
        );

        options_[optionID] = Option({
            moduleID: _moduleIdentifier,
            module: moduleInstance,
            functionSignature: _functionSignature,
            requiredData: _requiredData,
            active: true
        });

        moduleOptions_[_moduleIdentifier].optionIDs.push(optionID);
    }

    // -------------------------------------------------------------------------
    // ONLY EXECUTOR STATE MODIFYING FUNCTIONS


}