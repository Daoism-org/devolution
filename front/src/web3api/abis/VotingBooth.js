const VOTING_BOOTH_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_baseModule",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposalID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "voterID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "votePosition",
        "type": "bool"
      }
    ],
    "name": "BallotCast",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "optionID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "moduleIdentifier",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "moduleImplementation",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes4",
        "name": "functionSignature",
        "type": "bytes4"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "requiredData",
        "type": "string"
      }
    ],
    "name": "OptionRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposalID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "expiryTimestamp",
        "type": "uint256"
      }
    ],
    "name": "ProposalElectionRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ModuleIdentifier",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SubModuleIdentifier",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propID",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_vote",
        "type": "bool"
      }
    ],
    "name": "castBinaryVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endSetUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBaseDao",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_identifier",
        "type": "string"
      }
    ],
    "name": "getBytes32Of",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_identifier",
        "type": "bytes32"
      }
    ],
    "name": "getModuleFromBase",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getModuleIdentifier",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isSubModule",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_optionID",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "_executionParameters",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "_expiryTimestamp",
        "type": "uint256"
      }
    ],
    "name": "registerElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "registerOptionsOnModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default VOTING_BOOTH_ABI;