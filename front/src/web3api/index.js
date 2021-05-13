import { DEVOLUTION_BASE_ADDR, SPOKE_DAO_ADDR, EXPLORER_ID_ADDR, VOTING_BOOTH_ADDR } from './config';
import DEVOLUTION_BASE_ABI from './abis/DevolutionBase.js';
import SPOKE_DAO_ABI from './abis/SpokeDao';
import EXPLORER_ID_ABI from './abis/ExplorerID';
import VOTING_BOOTH_ABI from './abis/VotingBooth';

import web3 from "../web3L1";

/* DEVOLUTION_BASE_ADDR */

export async function joinDevolution() { //Tested: https://kovan.etherscan.io/tx/0x16a665cffee1102ae7f05b4ac272a361cc7a8025c1c6ffba82eb52533dc618de
  try {
    let txAccount = (await web3.eth.getAccounts())[0];
    //console.log("[DEBUG]txAccount", txAccount);
    //console.log("[DEBUG]DEVOLUTION_BASE_ABI", DEVOLUTION_BASE_ABI);
    //console.log("[DEBUG]DEVOLUTION_BASE_ADDR", DEVOLUTION_BASE_ADDR);
    let DevolutionBaseContract = new web3.eth.Contract(DEVOLUTION_BASE_ABI, DEVOLUTION_BASE_ADDR);
    //console.log("[DEBUG]DevolutionBaseContract", DevolutionBaseContract);
    const gas = await DevolutionBaseContract.methods.joinDevolution().estimateGas();
    let gasToSend = gas*10; //For some reason when I tried with just the right amount of gas like I usually do, the transaction run out of gas... so 10xed just to be sure
    //console.log("[DEBUG]gasToSend", gasToSend);
    let result = await DevolutionBaseContract.methods.joinDevolution().send({ from: txAccount, gasToSend });
    //console.log("[DEBUG]result", result);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function isMember() { //Tested: true
  try {
    let txAccount = (await web3.eth.getAccounts())[0];
    let DevolutionBaseContract = new web3.eth.Contract(DEVOLUTION_BASE_ABI, DEVOLUTION_BASE_ADDR);
    let result = await DevolutionBaseContract.methods.isMember(txAccount).call({ from: txAccount });
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

/* SPOKE_DAO_ADDR */

export async function joinSpokeDao() { //Tested: https://kovan.etherscan.io/tx/0x1553042f93a1bfdaab7a5a1b76afe312ef30fd3b4a430e4355eb0dd852aa0a06
  try {
    let txAccount = (await web3.eth.getAccounts())[0];
    //console.log("[DEBUG]txAccount", txAccount);
    //console.log("[DEBUG]SPOKE_DAO_ABI", SPOKE_DAO_ABI);
    //console.log("[DEBUG]SPOKE_DAO_ADDR", SPOKE_DAO_ADDR);
    let SpokeDaoContract = new web3.eth.Contract(SPOKE_DAO_ABI, SPOKE_DAO_ADDR);
    //console.log("[DEBUG]SpokeDaoContract", SpokeDaoContract);
    //It seems this function crashes "MetaMask - RPC Error: The execution failed due to an exception."
    //because the node/network? is not able to estimate tx fees, b/c there is not enough transactions?
    //const gas = await SpokeDaoContract.methods.joinSpokeDao().estimateGas();
    let gasToSend = 99999999999;
    //console.log("[DEBUG]gasToSend", gasToSend);
    let result = await SpokeDaoContract.methods.joinSpokeDao().send({ from: txAccount, gasToSend });
    //console.log("[DEBUG]result", result);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getJoinedSpokes() { //Tested: ["0xcC066380ec146569b82b01ba007e0784b11F96A7"]
  try {
    let txAccount = (await web3.eth.getAccounts())[0];
    let ExplorerIdContract = new web3.eth.Contract(EXPLORER_ID_ABI, EXPLORER_ID_ADDR);
    let result = await ExplorerIdContract.methods.getJoinedSpokes(txAccount).call({ from: txAccount });
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

/* VOTING_BOOTH_ADDR */

export async function registerElection(optionID, executionParameters, expiryTimestamp) { //Not tested yet, but should work
  try {
    let txAccount = (await web3.eth.getAccounts())[0];
    let VotingBoothContract = new web3.eth.Contract(VOTING_BOOTH_ABI, VOTING_BOOTH_ADDR);
    let gasToSend = 99999999999; //Same reason than for joinSpokeDao()
    let result = await VotingBoothContract.methods.registerElection(optionID, executionParameters, expiryTimestamp).send({ from: txAccount, gasToSend });
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function castBinaryVote(propId, voteBool) { //Not tested yet, but should work
  try {
    let txAccount = (await web3.eth.getAccounts())[0];
    let VotingBoothContract = new web3.eth.Contract(VOTING_BOOTH_ABI, VOTING_BOOTH_ADDR);
    let gasToSend = 99999999999; //Same reason than for joinSpokeDao()
    let result = await VotingBoothContract.methods.castBinaryVote(propId, voteBool).send({ from: txAccount, gasToSend });
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}