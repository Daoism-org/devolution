# Integrations

# Required contracts for integration:

| Contract | Calls |
|:---------|:------|
0. Devolution Base | To get a list of all spoke DAOs `getAllSpokeDaos()`
1. Explorer ID token | `getJoinedSpokes(address _voter)`
2. Spoke DAO | `joinSpokeDao()`
3.1 Voting Booth | Requesting proposal: `registerElection(bytes32 _optionID, bytes calldata _executionParameters, uint256 _expiryTimestamp)`, Voting on proposal: `castBinaryVote(uint256 _propID, bool _vote)` |
3.2 Proposal Storage | Getting a proposals information: `getProposalInfo(uint256 _propID)`
<!-- 4. Reputation Coordinator |  -->
<!-- 3. Vote Coordinator | `getModuleOptions(bytes32 _moduleIdentifier)` -->

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