// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./IRepToken.sol";
import "../devolution-platform/identity/IExplorer.sol";
import "../base-implementations/modules/BaseSubModule.sol";

contract VotingWeight is BaseSubModule {
    // Constant of this sub modules identifier
    bytes32 internal constant SubModuleIdentifier_ = "VotingWeight";

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(address _baseModule) 
        BaseSubModule(SubModuleIdentifier_, _baseModule)
    {
        baseModule_ = IBaseModule(_baseModule);

    }

    function init() external override {

    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    function getVoterWeight(address _voter) external view returns(uint256) {
        uint256 voterID = IExplorer(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.DevolutionSystemIdentity
            )
        ).getOwnerToken(_voter);

        require(
            voterID != 0,
            "Voter does not own identity"
        );
        uint256 userRepBalance = IRepToken(
            baseModule_.getModuleFromBase(
                BaseDaoLibrary.ReputationToken
            )
        ).balanceOf(_voter);

        return _calculateVoteWeight(userRepBalance, 1, 1);
    }

    // -------------------------------------------------------------------------
    // STATE MODIFYING FUNCTIONS

    function registerOptionsOnModule() external override {

    }

    // -------------------------------------------------------------------------
    // ONLY EXECUTOR STATE MODIFYING FUNCTIONS

    // -------------------------------------------------------------------------
    // INTERNAL FUNCTIONS

    function _calculateVoteWeight(
        uint256 _reputation,
        uint256 _spokeGov,
        uint256 _systemGov
    ) internal pure returns(uint256) {
        if(_reputation * _spokeGov * _systemGov > 0) {
            // FUTURE make this into a real updatable equation of sorts
            return(_reputation * _spokeGov * _systemGov); 
        }
        return 1;
    }
}