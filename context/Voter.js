import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";
import { set } from "mongoose";
import { sendError } from "next/dist/server/api-utils";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);

export const VoterContext = React.createContext();

export const VotingProvider = ({ children }) => {
    const router = useRouter();
    const [currentAccount, setcurrentAccount] = useState("");
    const [candidateLength, setcandidateLength] = useState("");
    const pushCandadiate = [];
    const candidateIndex = [];
    const [candiadateArray, setcandiadateArray] = useState(pushCandadiate);

    const [candidatAddressArrayList, setcandidatAddressArrayList] = useState([]);


    ////////////////////////////////

    const [error, seterror] = useState("");
    const highestVote = [];

    ////////////////////////////////

    const pushVoter = [];
    const [voterArray, setvoterArray] = useState(pushVoter);
    const [voterLength, setvoterLength] = useState("");
    const [voterAddress, setvoterAddress] = useState([]);

    ////////////////////////////////

    const [pollArray, setpollArray] = useState([]);
    const [detailPoll, setdetailPoll] = useState();

    //// CONNECT METAMASK

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) {
            return seterror("Make sure you have metamask!");
        }

        const account = await window.ethereum.request({ method: "eth_accounts" });
        if (account.length !== 0) {
            setcurrentAccount(account[0]);
        } else {
            seterror("Please connect with metamask & connect and reload the page");
        }
    };

    //// Connect to wallet

    const connectWallet = async () => {
        if (!window.ethereum) {
            return seterror("Make sure you have metamask!");
        }

        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setcurrentAccount(account[0]);
    };

    //// UPLOAD TO IPFS

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });

            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return url;
        } catch (error) {
            seterror("Error uploading file to infura. Try again");
        }
    };
    ///////////////// Create Voter

    const createVoter = async (inputForm, fileUrl, router) => {
        try {
            const { name, address, age, email, pincode } = inputForm;
            console.log(name, address, age, email, pincode, fileUrl);

            if (!name || !address || !email || !pincode || !age) {

                return seterror("Please fill all the fields");
            }



            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            console.log("1");
            const provider = new ethers.BrowserProvider(window.ethereum);
            console.log("2");
            const signer = await provider.getSigner();
            console.log("3");
            const contract = fetchContract(signer);
            console.log("4");
            console.log(contract);



            const voter = await contract
                .createVoter(name, age, address, email, pincode)
                .catch((err) => {
                    seterror("Error creating voter");
                    console.log(err);
                });
            console.log("5");
            voter.wait();
            console.log("6");
            console.log(voter);

            router.push("/voters/voterList");
        } catch (error) {
            console.log(error);
        }
    };

    const getVoterList = async () => {
        const web3Modle = new Web3Modal();
        const connection = await web3Modle.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        console.log("Inside getVoterList")

        try {
            const voterAddressList = await contract.getAllVoters();
            setvoterAddress(voterAddressList);

            const voterDataPromises = voterAddressList.map(async (el) => {
                return contract.getVoterData(el);
            });

            const voterData = await Promise.all(voterDataPromises);
            setvoterArray(voterData);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllVoterAddress = async () => {
        const web3Modle = new Web3Modal();
        const connection = await web3Modle.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        try {
            const voterAddressList = await contract.getAllVoters();

            setvoterAddress(voterAddressList);
        } catch (error) {
            console.log(error);
        }
    }


    ////// Add a new candidate

    const addCandidate = async (inputForm, fileUrl, router) => {
        try {
            const { name, address, manifesto, age, pincode, email } = inputForm;
            console.log(name, address, manifesto, age, pincode, email, fileUrl);

            if (!name || !address || !manifesto || !age || !pincode || !email) {
                return seterror("Please fill all the fields");
            }
            console.log("1");

            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);
            console.log("2");
            const candidate = await contract
                .setCandidate(address, name, age, email, manifesto, pincode)
                .catch((err) => {
                    seterror("Error creating candidate");
                    console.log(err);
                });
            console.log("3");
            candidate.wait();

            router.push("/candidates/candidateList");
        } catch (error) {
            seterror("Error creating candidate");
            console.log(error);
        }
    };

    const getCandidateList = async () => {
        const web3Modle = new Web3Modal();
        const connection = await web3Modle.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        try {
            const candidateAddressList = await contract.getAllCandidates().catch((err) => {
                seterror("Error creating candidate 1");
                console.log(err);
            });
            // setcandidateLength(candidateAddressList.length);

            const candidateDataPromises = candidateAddressList.map(async (el) => {
                return contract.getCandidateData(el).catch((err) => {
                    seterror("Error creating candidate 2");
                    console.log(err);
                });
            });

            const candidateData = await Promise.all(candidateDataPromises);
            setcandiadateArray(candidateData);
        } catch (error) {
            console.log(error);
        }
    };

    const getCandidateDataForVoting = async (addresses) => {
        const web3Modle = new Web3Modal();
        const connection = await web3Modle.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        try {
            const candidateDataPromises = addresses.map(async (el) => {
                return contract.getCandidateData(el).catch((err) => {
                    seterror("Error creating candidate 2");
                    console.log(err);
                });
            });

            const candidateData = await Promise.all(candidateDataPromises);
            setcandiadateArray(candidateData);
        } catch (error) {
            console.log(error);
        }
    }

    const getCandidateAddress = async () => {
        const web3Modle = new Web3Modal();
        const connection = await web3Modle.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        try {
            const candidateAddressList = await contract.getAllCandidates().catch((err) => {
                seterror("Error creating candidate 1");
                console.log(err);
            });
            console.log("candidateAddressList from function", candidateAddressList);

            setcandidatAddressArrayList(candidateAddressList);

        } catch (error) {
            sendError("Error fetching the addresses of candidates address");
            console.log(error);
        }
    }

    ///////////////////////////////////////////

    const createNewPoll = async (inputForm, router) => {
        try {
            const { title, description } = inputForm;
            console.log(title, description);

            if (!title || !description) {
                return seterror("Please fill all the fields");
            }

            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const poll = await contract
                .createPoll(title, description, [], [], 0, 0)
                .catch((err) => {
                    seterror("Error creating poll");
                    console.log(err);
                });

            poll.wait();

            router.push("/poll/pollList");
        } catch (error) {
            console.log(error);
            seterror("Error creating poll");
        }
    };

    const getAllPolls = async () => {
        try {
            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const pollAddressList = await contract.getAllPollesIds();
            console.log(pollAddressList);
            const pollDataPromises = pollAddressList.map(async (el) => {
                return contract.getPollData(el);
            })

            const pollData = await Promise.all(pollDataPromises);
            setpollArray(pollData);
            console.log(pollData);
        } catch (error) {
            console.log(error);
            seterror("Error fetching the poll");
        }
    }

    const getPollData = async (id) => {
        try {
            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const pollData = await contract.getPollData(id);
            setdetailPoll(pollData);
        } catch (error) {
            seterror("Error fetching the poll");
            console.log(error);
        }
    }

    const addVoterToPoll = async (pollId, voterAddress) => {
        try {
            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const poll = await contract.addVoterToPoll(pollId, voterAddress);
            poll.wait();
        } catch (error) {
            seterror("Error adding voter to poll");
            console.log(error);
        }
    }

    const addCandidateToPoll = async (pollId, candidateAddress) => {
        try {
            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const poll = await contract.addCandidateToPoll(pollId, candidateAddress);
            poll.wait();
        } catch (error) {
            seterror("Error adding candidate to poll");
            console.log(error);
        }
    }


    ////////////////////////////////////////////

    const castVoteToCandidate = async (candidateAddress, candidateId, pollId) => {
        try {
            const web3Modle = new Web3Modal();
            const connection = await web3Modle.connect();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = fetchContract(signer);

            const castVote = await contract.castVote(candidateAddress, candidateId, pollId);
            castVote.wait();
        } catch (error) {
            seterror("Error adding candidate to poll");
            console.log(error);
        }
    }


    const votingTitle = "Voting Contract";
    return (
        <VoterContext.Provider
            value={{
                votingTitle,
                createVoter,
                getVoterList,
                getAllVoterAddress,
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                voterArray,
                voterAddress,
                addCandidate,
                getCandidateList,
                getCandidateAddress,
                candidatAddressArrayList,
                candiadateArray,
                pollArray,
                createNewPoll,
                getAllPolls,
                getPollData,
                detailPoll,
                addVoterToPoll,
                addCandidateToPoll,
                getCandidateDataForVoting,
                castVoteToCandidate
            }}
        >
            {children}
        </VoterContext.Provider>
    );
};

const Voter = () => {
    return <div></div>;
};

export default Voter;
