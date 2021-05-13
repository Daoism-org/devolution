/* External Imports */
const { ethers, network } = require('hardhat')
const chai = require('chai')
const { solidity } = require('ethereum-waffle')
const chaiAsPromised = require('chai-as-promised')
const { expect } = chai

const { BigNumber } = require("bignumber.js");

chai.use(chaiAsPromised)
chai.use(solidity)

describe("Basic Deployment Test", () =>  {
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

    // Signers
    let deployer;
    let spokeCreator;
    let spokeParticipant;
    let proposalRequester;
    let voterFor;
    let voterAgainst;

    before(async () => {
        // Getting all the contracts 

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

        // Getting signers
        [
            deployer, 
            spokeCreator, 
            spokeParticipant, 
            proposalRequester,
            voterFor,
            voterAgainst
        ] = await ethers.getSigners();

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
        
        await DevBaseInstance.connect(spokeParticipant).joinDevolution();
        console.log("...");
        await DevBaseInstance.connect(proposalRequester).joinDevolution();
        console.log("...");
        await DevBaseInstance.connect(voterFor).joinDevolution();
        console.log("...");
        await DevBaseInstance.connect(voterAgainst).joinDevolution();
    });

    describe("Checks state changes as expected", () => { 
        it("Can get modules from Spoke DAO", async () => {
            let identifier = await GeneralCensusInstance.getModuleIdentifier();

            let test = await SpokeDaoInstance.getModuleAddress(identifier)

            console.log(test)
            console.log(GeneralCensusInstance.address)
        });
    });

    describe("Can interact with contracts", () => { 
        it("Getting all DAOs an explorer is a part of", async () => {
            await SpokeDaoInstance.connect(spokeParticipant).joinSpokeDao();

            let joinedDaos = await DevIDInstance.getJoinedSpokes(
                spokeParticipant.address
            );

            console.log(joinedDaos);
        });

        it("Getting options", async () => {
            // TODO Getting options
        });

        it("Requesting a proposal", async () => {
            await SpokeDaoInstance.connect(proposalRequester).joinSpokeDao();

            let bytes32Conversion = await VoteBoothInstance.getBytes32Of(
                "GeneralCensus.updateConsensusRequirements(uint256,uint256)"
            );

            let bytesConversion = await VoteBoothInstance.getBytes32Of(
                "5,10"
            );

            let currentTime = await VoteBoothInstance.getCurrentTime();

            console.log(bytes32Conversion.toString())
            console.log(bytesConversion.toString())
            console.log(currentTime.toString())
            
            let tx = await (
                await VoteBoothInstance.connect(proposalRequester).registerElection(
                    bytes32Conversion.toString(),
                    bytesConversion.toString(),
                    currentTime
                )
            ).wait();

            let propInfoOne = await PropsStorageInstance.getProposalInfo(1)

            console.log(propInfoOne)
        });
        
        it("Voting on a proposal", async () => {
            await SpokeDaoInstance.connect(voterFor).joinSpokeDao();
            await SpokeDaoInstance.connect(voterAgainst).joinSpokeDao();

            let bytes32Conversion = await VoteBoothInstance.getBytes32Of(
                "GeneralCensus.updateConsensusRequirements(uint256,uint256)"
            );

            let bytesConversion = await VoteBoothInstance.getBytes32Of(
                "5,10"
            );

            let currentTime = await VoteBoothInstance.getCurrentTime();
            
            let tx = await (
                await VoteBoothInstance.connect(proposalRequester).registerElection(
                    bytes32Conversion.toString(),
                    bytesConversion.toString(),
                    currentTime
                )
            ).wait();

            let propID = tx.events[0].args.proposalID.toString();

            let voteForTx = await (
                await VoteBoothInstance.connect(proposalRequester).castBinaryVote(
                    propID.toString(),
                    true
                )
            ).wait(); 
            let voteForTwoTx = await (
                await VoteBoothInstance.connect(voterFor).castBinaryVote(
                    propID.toString(),
                    true
                )
            ).wait(); 
            let voteAgainstTx = await (
                await VoteBoothInstance.connect(voterAgainst).castBinaryVote(
                    propID.toString(),
                    false
                )
            ).wait(); 
                
            console.log("Vote for");
            console.log(voteForTx.events[0].args.proposalID.toString())
            console.log(voteForTx.events[0].args.voterID.toString())
            console.log(voteForTx.events[0].args.votePosition)
            console.log("Vote for two");
            console.log(voteForTwoTx.events[0].args.proposalID.toString())
            console.log(voteForTwoTx.events[0].args.voterID.toString())
            console.log(voteForTwoTx.events[0].args.votePosition)
            console.log("Vote against");
            console.log(voteAgainstTx.events[0].args.proposalID.toString())
            console.log(voteAgainstTx.events[0].args.voterID.toString())
            console.log(voteAgainstTx.events[0].args.votePosition)
        });

        it("Census on proposal", async () => {
            let voteStorage = await VoteStorageInstance.getProposalElectionResults(
                2
            );
            let census = await GeneralCensusInstance.doesElectionReachConsensus(
                2
            );

            console.log(voteStorage)
            console.log(census)
        });
    });
});