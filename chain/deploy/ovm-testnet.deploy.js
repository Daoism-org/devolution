// Just a standard hardhat-deploy deployment definition file!
const func = async (hre) => {
    const { deployments, getNamedAccounts, ethers, network } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

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
  
    const initialSupply = 1000000
    const name = 'My Optimistic Token'
  
    DevBaseInstance = await deploy('DevolutionBase', {
      from: deployer,
      gasPrice: hre.ethers.BigNumber.from('0'),
      gasLimit: 8999999,
      log: true
    })
    DevIDInstance = await deploy('ExplorerID', {
      from: deployer,
      args: [DevBaseInstance.address],
      gasPrice: hre.ethers.BigNumber.from('0'),
      gasLimit: 8999999,
      log: true
    })
    await DevBaseInstance.addIdentityInstance(
      DevIDInstance.address
    );
    SpokeDaoInstance = await deploy('DevolutionBase', {
      from: deployer,
      args: [initialSupply, name],
      gasPrice: hre.ethers.BigNumber.from('0'),
      gasLimit: 8999999,
      log: true
    })
  }
  
  func.tags = ['ERC20']
  module.exports = func
  