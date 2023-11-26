//LPDX-Lincense-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _votingId;
    Counters.Counter public _candidateId;
    Counters.Counter public _pollId;

    address public votingOrganizer;

    constructor() {
        votingOrganizer = msg.sender;
    }

    /// Candidate for the voting

    struct Candidate {
        uint256 _candidateId;
        string name;
        uint256 age;
        uint256 voteCount;
        address _address;
        string email;
        string manefesto;
        string pincode;
    }

    event CandidateCreated(
        uint256 indexed _candidateId,
        string name,
        uint256 age,
        uint256 voteCount,
        address _address,
        string email,
        string manefesto,
        string pincode
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
        address _address;
        bool voted;
        uint256 allowed;
        uint256 vote;
        string email;
        string pincode;
    }

    event VoterCreated(
        uint256 indexed _voterId,
        string name,
        uint256 age,
        address _address,
        bool voted,
        uint256 allowed,
        uint256 vote,
        string email,
        string pincode
    );

    function setCandidate(
        address _address,
        string memory _name,
        uint256 _age,
        string memory email,
        string memory manefesto,
        string memory pincode
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
        candidate.voteCount = 0;
        candidate._address = _address;
        candidate.email = email;
        candidate.manefesto = manefesto;
        candidate.pincode = pincode;
        candidatesAddress.push(_address);

        emit CandidateCreated(
            idNumber,
            _name,
            _age,
            0,
            _address,
            email,
            manefesto,
            pincode
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
        address _address,
        string memory email,
        string memory pincode
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
        voter._address = _address;
        voter.voted = false;
        voter.allowed = 1;
        voter.vote = 1000;
        voter.email = email;
        voter.pincode = pincode;

        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _age,
            _address,
            false,
            1,
            voter.vote,
            email,
            pincode
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

    struct Poll {
        uint256 _pollId;
        string title;
        string description;
        address[] voters;
        address[] candidates;
        uint256 startDate;
        uint256 endDate;
        uint256 votersVotedCount;
        bool isActive;
    }

    event PollCreated(
        uint256 indexed _pollId,
        string title,
        string description,
        address[] voters,
        address[] candidates,
        uint256 startDate,
        uint256 endDate,
        bool isActive,
        uint256 votersVotedCount
    );

    mapping(uint256 => Poll) public polls;
    uint256[] public pollIds;

    function createPoll(
        string memory _title,
        string memory _description,
        address[] memory _voters,
        address[] memory _candidates,
        uint256 _startDate,
        uint256 _endDate
    ) public {
        require(
            msg.sender == votingOrganizer,
            "Only Organizer can add candidate"
        );

        _pollId.increment();

        uint256 idNumber = _pollId.current();

        Poll storage poll = polls[idNumber];
        pollIds.push(idNumber);

        poll._pollId = idNumber;
        poll.title = _title;
        poll.description = _description;
        poll.voters = _voters;
        poll.candidates = _candidates;
        poll.startDate = _startDate;
        poll.endDate = _endDate;
        poll.isActive = true;
        poll.votersVotedCount = 0;

        emit PollCreated(
            idNumber,
            _title,
            _description,
            _voters,
            _candidates,
            _startDate,
            _endDate,
            false,
            0
        );
    }

    function getAllPollesIds() public view returns (uint256[] memory) {
        return pollIds;
    }

    function getPollData(uint256 id) public view returns (Poll memory) {
        return polls[id];
    }

    function startAPoll(uint256 id) public {
        require(
            msg.sender == votingOrganizer,
            "Only Organizer can add candidate"
        );

        Poll storage poll = polls[id];

        poll.isActive = true;
    }

    function addVoterToPoll(uint256 pollId, address _voterAddress) public {
        require(
            msg.sender == votingOrganizer,
            "Only Organizer can add candidate"
        );

        Poll storage poll = polls[pollId];

        poll.voters.push(_voterAddress);
    }

    function addCandidateToPoll(
        uint256 pollId,
        address _candidateAddress
    ) public {
        require(
            msg.sender == votingOrganizer,
            "Only Organizer can add candidate"
        );

        Poll storage poll = polls[pollId];

        poll.candidates.push(_candidateAddress);
    }
}
