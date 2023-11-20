//LPDX-Lincense-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _votingId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    constructor() {
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

    function setCandidate(
        address _address,
        string memory _name,
        uint256 _age,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            msg.sender == votingOrganizer,
            "Only Organizer can add candidate"
        );
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();

        Candidate storage candidate = candidates[_address];
        candidate._candidateId = idNumber;
        candidate.name = _name;
        candidate.age = _age;
        candidate.image = _image;
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidatesAddress.push(_address);

        emit CandidateCreated(
            idNumber,
            _name,
            _age,
            _image,
            0,
            _address,
            _ipfs
        );
    }

    function getAllCandidates() public view returns (address[] memory) {
        return candidatesAddress;
    }

    function getCandidateNumbers() public view returns (uint256) {
        return candidatesAddress.length;
    }

    function getCandidateData(
        address _address
    ) public view returns (Candidate memory) {
        return candidates[_address];
    }

    function createVoter(
        string memory _name,
        uint256 _age,
        string memory _image,
        string memory _ipfs,
        address _address
    ) public {
        require(
            msg.sender == votingOrganizer,
            "Only Organizer can add candidate"
        );
        _votingId.increment();
        uint256 idNumber = _votingId.current();

        Voters storage voter = voters[_address];
        voter._voterId = idNumber;
        voter.name = _name;
        voter.age = _age;
        voter.image = _image;
        voter._address = _address;
        voter.ipfs = _ipfs;
        voter.voted = false;
        voter.allowed = 1;
        voter.vote = 1000;

        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _age,
            _image,
            _address,
            _ipfs,
            false,
            1,
            voter.vote
        );
    }

    function castVote(
        address _cadidateAddress,
        uint256 _candidateVoteID
    ) external {
        Voters storage voter = voters[msg.sender];

        require(!voter.voted, "Already voted.");

        require(voter.allowed != 0, "You are not allowed to vote");

        voter.voted = true;
        voter.vote = _candidateVoteID;

        votetedVoters.push(msg.sender);

        candidates[_cadidateAddress].voteCount += voter.allowed;
    }

    function getVoterLenghth() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterData(
        address _address
    ) public view returns (Voters memory) {
        return voters[_address];
    }

    function getVotedVoters() public view returns (address[] memory) {
        return votetedVoters;
    }

    function getAllVoters() public view returns (address[] memory) {
        return votersAddress;
    }
}
