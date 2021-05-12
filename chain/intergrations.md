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

Contract addresses: 
Devolution Base:    0xFED8CfD488fd7D6b8731472D9F0B09d7Af6CF945
Exploer ID:         0xA47c45D83d5cbC43bfbBE8CE25A8D6235301b8c5
Spoke DAO:          0xcC066380ec146569b82b01ba007e0784b11F96A7
Vote Storage:        
Voting Booth:       0xa0E0d7e743Fcd6D6A6105c92bebf801216fFDf45
General Census:   
Options registry:    
Proposal Storage:   0xd08310D1154AA11a17Cb37A2548A1eEFD5c62AA9



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