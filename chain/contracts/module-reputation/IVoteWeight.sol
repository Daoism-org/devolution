// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

interface IVoteWeight {
    function getVoterWeight(address _voter) external view returns(uint256);
}