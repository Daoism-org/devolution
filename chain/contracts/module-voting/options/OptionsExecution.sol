// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../../base-implementations/modules/BaseSubModule.sol";

// TODO logic for options execution
contract OptionsExecution is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "OptionsExecutor";

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


    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function executeOption() external onlyModule(BaseDaoLibrary.GeneralCensus) {
        
    }

    function registerOptionsOnModule() external override {

    }

    // -------------------------------------------------------------------------
    // ONLY EXECUTOR STATE MODIFYING FUNCTIONS

}