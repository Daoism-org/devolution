// Imports
const { ethers } = require("hardhat");
import * as dotenv from "dotenv";

dotenv.config();

// The deployment script
const main = async () => {
    // Getting the first signer as the deployer
    const [deployer] = await ethers.getSigners();
    // Saving the info to be logged in the table (deployer address)
    var deployerLog = { Label: "Deploying Address", Info: deployer.address };
    // Saving the info to be logged in the table (deployer address)
    var deployerBalanceLog = {
        Label: "Deployer ETH Balance",
        Info: (await deployer.getBalance()).toString(),
    };

    // Contracts
    // Devolution platform contracts
    let DevBaseInstance;
    let DevIDInstance;
    
    // Spoke DAO contracts
    let SpokeDaoInstance;
    
    // Voting Module
    let VotingModuleContract;
    let VoteStorageContract;
    let VoteBoothContract;
    let GeneralCensusContract;
    let OptionsRegistryContract;
    let PropsStorageContract;
    // Voting module instances
    let VotingModuleInstance;
    let VoteStorageInstance;
    let VoteBoothInstance;
    let GeneralCensusInstance;
    let OptionsRegistryInstance;
    let PropsStorageInstance;
    
    // Reputation Module
    let ReputationModuleContract;
    let VotingWeightContract;
    let ReputationTokenContract;
    let ReputationDistributionContract;
    // Reputation module instances
    let ReputationModuleInstance;
    let VotingWeightInstance;
    let ReputationTokenInstance;
    let ReputationDistributionInstance;

    let devBasContract = { Label: "Devolution Base", Info: null };
    let explIDContract = { Label: "Explorer ID", Info: null };
    let spoDAOContract = { Label: "Spoke DAO", Info: null };
    let votBooContract = { Label: "Voting Booth", Info: null, };
    let proStoContract = { Label: "Proposal Storage", Info: null, };

    // Devolution platform
    const DevBaseContract = await ethers.getContractFactory("DevolutionBase");
    const DevIDContract = await ethers.getContractFactory("ExplorerID");

    // Spoke DAO contracts
    const SpokeDaoContract = await ethers.getContractFactory("SpokeDao");

    VotingModuleContract = await ethers.getContractFactory("VotingCoordinator");
    VoteStorageContract = await ethers.getContractFactory("VoteStorage");
    VoteBoothContract = await ethers.getContractFactory("VotingBooth");
    GeneralCensusContract = await ethers.getContractFactory("GeneralCensus");
    OptionsRegistryContract = await ethers.getContractFactory("OptionsRegistry");
    PropsStorageContract = await ethers.getContractFactory("ProposalStorage");

    ReputationModuleContract = await ethers.getContractFactory("ReputationCoordinator");
    VotingWeightContract = await ethers.getContractFactory("VotingWeight");
    ReputationTokenContract = await ethers.getContractFactory("ReputationToken");
    ReputationDistributionContract = await ethers.getContractFactory("ReputationDistribution");

    // Deploying contracts
    DevBaseInstance = await DevBaseContract.deploy();
    console.log("🛠  Devolution Base Deployed.");

    DevIDInstance = await DevIDContract.deploy(
        DevBaseInstance.address
    );
    console.log("🛠  Devolution Identity Deployed.");
    
    await DevBaseInstance.addIdentityInstance(
        DevIDInstance.address
    );
    console.log("✅ Devolution Identity Successfully registered.");
    
    SpokeDaoInstance = await SpokeDaoContract.deploy(
        DevBaseInstance.address
    );
    console.log("🛠 Spoke DAO Deployed.");

    // ---------------------------------------------------------------------
    // Voting Module

    VotingModuleInstance = await VotingModuleContract.deploy(
        SpokeDaoInstance.address
    );
    console.log("...");

    VoteStorageInstance = await VoteStorageContract.deploy(
        VotingModuleInstance.address
    );
    console.log("...");

    VoteBoothInstance = await VoteBoothContract.deploy(
        VotingModuleInstance.address
    );
    console.log("...");

    OptionsRegistryInstance = await OptionsRegistryContract.deploy(
        VotingModuleInstance.address
    );
    console.log("...");

    PropsStorageInstance = await PropsStorageContract.deploy(
        VotingModuleInstance.address
    );
    console.log("...");

    GeneralCensusInstance = await GeneralCensusContract.deploy(
        VotingModuleInstance.address,
        1,
        1
    );

    console.log("🛠 Deployed Vote Module and submodules.");

    await VotingModuleInstance.registerSubmodule(
        VoteStorageInstance.address
    );
    console.log("...");

    await VotingModuleInstance.registerSubmodule(
        VoteBoothInstance.address
    );
    console.log("...");

    await VotingModuleInstance.registerSubmodule(
        OptionsRegistryInstance.address
    );
    console.log("...");

    await VotingModuleInstance.registerSubmodule(
        PropsStorageInstance.address
    );
    console.log("...");

    await VotingModuleInstance.registerSubmodule(
        GeneralCensusInstance.address
    );

    console.log("✅ Successfully registered submodules.");

    // ---------------------------------------------------------------------
    // Reputation Module

    ReputationModuleInstance = await ReputationModuleContract.deploy(
        SpokeDaoInstance.address
    );
    console.log("...");

    VotingWeightInstance = await VotingWeightContract.deploy(
        VotingModuleInstance.address
    );
    console.log("...");

    ReputationTokenInstance = await ReputationTokenContract.deploy(
        VotingModuleInstance.address
    );
    console.log("...");

    ReputationDistributionInstance = await ReputationDistributionContract.deploy(
        VotingModuleInstance.address
    );

    console.log("🛠 Deployed Reputation Module and submodules.");

    await ReputationModuleInstance.registerSubmodule(
        VotingWeightInstance.address
    );
    console.log("...");

    await ReputationModuleInstance.registerSubmodule(
        ReputationTokenInstance.address
    );
    console.log("...");

    await ReputationModuleInstance.registerSubmodule(
        ReputationDistributionInstance.address
    );

    console.log("✅ Successfully registered submodules.");

    // ---------------------------------------------------------------------
    // Registering modules on Spoke DAO

    let tx = await (
        await SpokeDaoInstance.init(
            VotingModuleInstance.address,
            ReputationModuleInstance.address,
            DevIDInstance.address
        )
    ).wait();

    console.log("✅ Successfully initialised Spoke.");
    
    console.log("✅ Deployment script completed!");

    console.table([
        deployerLog,
        deployerBalanceLog,
        devBasContract,
        explIDContract,
        spoDAOContract,
        votBooContract,
        proStoContract
    ]);
};
    // Runs the deployment script, catching any errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});
