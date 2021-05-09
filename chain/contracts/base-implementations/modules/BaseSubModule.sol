// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;


import "./Base.sol";

abstract contract BaseSubModule is Base {
    // Identifier for the submodule
    bytes32 public immutable SubModuleIdentifier;

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(bytes32 _identifier, address _baseModule) 
        Base(
            _identifier, 
            address(0), 
            true, 
            _baseModule
        )
    {
        spokeDaoInstance_ = BaseDao(IBaseModule(baseModule_).getBaseDao());
        SubModuleIdentifier = _identifier;
    }

    function init() external virtual;

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    // function registerOptions(
    //     bytes4 _functionSig,
    //     bytes _parameters
    //     // TODO options registry 
    // )

    // -------------------------------------------------------------------------
    // ONLY EXECUTOR STATE MODIFYING FUNCTIONS

    function registerOptionsOnModule() external virtual;
    // function registerOptionsOnModule(
    //     bytes32 _moduleIdentifier,
    //     bytes4 _functionSignature,
    //     string calldata _requiredData
    // ) external virtual;
        // QS move modules to using new interface

}