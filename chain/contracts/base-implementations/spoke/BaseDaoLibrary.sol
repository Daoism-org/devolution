// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

/**
 * @author
 * @notice  This Library contains the required identifiers for the basic 
 *          Devolution DAO ecosystem. Additional modules can be added to the
 *          `DaoIdentifier` so long as they inherit the `BaseModule.sol` 
 *          contract.
 */
library BaseDaoLibrary {
    // Devolution Platform
    bytes32 public constant DevolutionDao = "DevolutionDao";
    bytes32 public constant DevolutionSystemIdentity = 
        "DevolutionSystemIdentity";
    
    // Spoke DAO 
    bytes32 public constant DaoIdentifier = "SpokeDaoV_0.1";
    // (OPTIONAL) DAO specific identity solution
    bytes32 public constant SpokeSpecificIdentity = 
        "SpokeSpecificIdentity";

    // Voting Module
    bytes32 public constant VotingCoordinator = "VotingCoordinator";
    // Options
        // Has rights to modify state on all contracts
    bytes32 public constant OptionsExecutor = "OptionsExecutor";
    bytes32 internal constant OptionsRegistry = "OptionsRegistry";
    // Proposals
    bytes32 internal constant ProposalStorage = "ProposalStorage";         

    // General Voting
    bytes32 internal constant GeneralCensus = "GeneralCensus";
    bytes32 internal constant VoteStorage = "VoteStorage";
    bytes32 internal constant VotingBooth = "VotingBooth";
    
    // Reputation Module
    bytes32 public constant ReputationCoordinator = "ReputationCoordinator";
    bytes32 internal constant ReputationToken = "ReputationToken";
    bytes32 internal constant ReputationDistribution = "ReputationDistribution";
    bytes32 internal constant VotingWeight = "VotingWeight";
}