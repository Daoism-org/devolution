# Integrations

# Required contracts for integration:

| Contract | Calls |
|:---------|:------|
0. Devolution Base | To get a list of all spoke DAOs `getAllSpokeDaos()`
1. Explorer ID token | Getting the users Develution identity token: ` getOwnerToken(address _owner)` Getting the Spoke DAO's the user is a part of: `getJoinedSpokes(address _voter)`
2. Spoke DAO | `joinSpokeDao()`
3.1 Voting Booth | Requesting proposal: `registerElection(bytes32 _optionID, bytes calldata _executionParameters, uint256 _expiryTimestamp)`, Voting on proposal: `castBinaryVote(uint256 _propID, bool _vote)` |
3.2 Proposal Storage | Getting a proposals information: `getProposalInfo(uint256 _propID)`
<!-- 4. Reputation Coordinator |  -->
<!-- 3. Vote Coordinator | `getModuleOptions(bytes32 _moduleIdentifier)` -->

LATEST ADDRESSES
Contract addresses: 

Devolution Base:    `0x6c3d85eC320e394629Db3564Dbe1D798F61092d6`
Explorer ID:        `0x25a062883b9eba54e98773A791aFbe90F826ab17`

Spoke DAO:          `0xFC9372557f71fDE61eF607857a2f113b2Ec9b8c3`

Vote Cord:          `0x1c1e6ece3675F08Bc7c275B2522A8478Bb220C69`
    Vote Storage:       `0xBF0BD0119aB6b0c44dcEa570844f1446820c1554`
    Voting Booth:       `0x1868e746c6773Ac737A451F4A944977F29195c1e`
    General Census:     `0xc4eE0b72c232F1671A841308cEDf02C2c4d9023b`
    Options registry:   `0x8A0eE28E27De620c5069f208f07D6d6911581438`
    Proposal Storage:   `0x6d6a2a21f40d40633F056a426E6c3c9B5bA9A46F`

Rep Coord:           `0x5A51A3a0D038D2F3afa45c633F263CcD7dc0dC68`
    Vote Weight:        `0x58A0C2F8158872ab07E75c98C01a0E87072Ee13c`
    Rep Token:          `0xB6Cd88b1C181e447d60a681BF0830687a826C8Af`
    Rep Dist:           `0x9f0143246E613585654742027249253D50B3F6c9`

Pre-created proposal ID: `1`

## Spoke DAO (i.e a deployed DAO)

#### Join
First you will need to join the Devolution identity system by calling from the users address (i.e a signed transaction)
```
DevolutionBase.joinDevolution()
```

To join a spoke DAO:
```
SpokeDaoInstance.joinSpokeDao();
```

#### Getting all joined spoke DAOs

To get all the spoke DAOs a user has joined, call:
```
ExplorerIDInstance.getJoinedSpokes(address _voter)
```
Passing in the users address. This is a view function and thus does not require a transaction to be signed. 

## Getting available options
Hardcode for now:
```

```

## Requesting a proposal 

```
VotingBooth.registerElection(bytes32 _optionID, bytes calldata _executionParameters, uint256 _expiryTimestamp)
```

## Voting on a proposal 

```
VotingBooth.castBinaryVote(uint256 _propID, bool _vote)
```


OLD ADDRESSES
Contract addresses: 
Devolution Base:    0xFED8CfD488fd7D6b8731472D9F0B09d7Af6CF945
Exploer ID:         0xA47c45D83d5cbC43bfbBE8CE25A8D6235301b8c5
Spoke DAO:          0xcC066380ec146569b82b01ba007e0784b11F96A7
Vote Storage:        
Voting Booth:       0xa0E0d7e743Fcd6D6A6105c92bebf801216fFDf45
General Census:   
Options registry:    
Proposal Storage:   0xd08310D1154AA11a17Cb37A2548A1eEFD5c62AA9

