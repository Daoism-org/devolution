const SPOKE_DAO_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_devolutionBase",
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
        "internalType": "bytes32",
        "name": "identifier",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "oldModule",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "module",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "moduleInUse",
        "type": "bool"
      }
    ],
    "name": "ModuleRegistryUpdated",
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_identifier",
        "type": "bytes32"
      }
    ],
    "name": "getModuleAddress",
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
        "internalType": "bytes32",
        "name": "_identifier",
        "type": "bytes32"
      }
    ],
    "name": "getModuleImplementationAndUse",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
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
        "internalType": "address",
        "name": "_votingInstance",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_reputationInstance",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_identityToken",
        "type": "address"
      }
    ],
    "name": "init",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "joinSpokeDao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "killDao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_identifier",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_newInstance",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_useNewInstance",
        "type": "bool"
      }
    ],
    "name": "updateModule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default SPOKE_DAO_ABI;