// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./IERC20.sol";
import "../base-implementations/modules/BaseModule.sol";
import "../base-implementations/spoke/BaseDaoLibrary.sol";

contract ReputationCoordinator is BaseModule {

    constructor(address _spokeDao) BaseModule(
        BaseDaoLibrary.ReputationCoordinator,
        _spokeDao
    ) {

    }

    function init(
        address _votingWeight,
        address _reputationToken,
        address _reputationDistributor
    ) external {
        bytes32 voteWeightID = BaseModule(_votingWeight).getModuleIdentifier();
        bytes32 repTokenID = BaseModule(_reputationToken).getModuleIdentifier();
        bytes32 repDistributorID = BaseModule(_reputationDistributor).getModuleIdentifier();

        _registerSubModule(
            voteWeightID,
            _votingWeight,
            true
        );
        _registerSubModule(
            repTokenID,
            _reputationToken,
            true
        );
        _registerSubModule(
            repDistributorID,
            _reputationDistributor,
            true
        );
    }
}