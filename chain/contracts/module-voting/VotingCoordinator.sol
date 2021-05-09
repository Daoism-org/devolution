// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "../base-implementations/modules/BaseModule.sol";
import "../base-implementations/spoke/BaseDaoLibrary.sol";

contract VotingCoordinator is BaseModule {

    // -------------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(address _spokeDao) BaseModule(
        BaseDaoLibrary.VotingCoordinator,
        _spokeDao
    ) {
        
    }

    // -------------------------------------------------------------------------
    // NON-MODIFYING FUNCTIONS

    /**
     * @return  address The address of the current storage implementation.
     */
    function getStorage() external view returns(address) {
        return address(0); // TODO update
    }

    /**
     * @param   _checked The address being checked
     * @return  bool If the `_checked` address is registered as a valid state
     *          modifier.
     */
    function isValidStateModifier(
        address _checked
    ) 
        external 
        view 
        returns(bool) 
    {
        // If the checked address is an approved state modifier or is options
        // executor.
        if(
            subModulesRegistry_[
                subModuleLookup_[_checked]
            ].inUse || 
            _checked == this.getModuleFromBase(
                BaseDaoLibrary.OptionsExecutor
            )
        ) {
            return true;
        }
    }
}