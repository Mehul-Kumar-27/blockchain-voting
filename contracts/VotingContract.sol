//LPDX-Lincense-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _votingId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    costructor() {
        votingOrganizer = msg.sender;
    }

    /// Candidate for the voting

    struct Candidate {
        uint256 _candidateId;
        string name;
        uint256 age;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreated(
        uint256 indexed _candidateId,
        string name,
        uint256 age,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidatesAddress;

    mapping(address => Candidate) public candidates;

    //// Voters Data

    address[] public votetedVoters;

    address[] public votersAddress;

    mapping(address => Voters) public voters;

    struct Voters {
        uint256 _voterId;
        string name;
        uint256 age;
        string image;
        address _address;
        string ipfs;
        bool voted;
        uint256 allowed;
        uint256 vote;
    }

    event VoterCreated(
        uint256 indexed _voterId,
        string name,
        uint256 age,
        string image,
        address _address,
        string ipfs,
        bool voted,
        uint256 allowed,
        uint256 vote
    );



    
}
