import React, { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

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

    ////////////////////////////////

    const [error, seterror] = useState("");
    const highestVote = [];

    ////////////////////////////////

    const pushVoter = [];
    const [voterArray, setvoterArray] = useState(pushVoter);
    const [voterLength, setvoterLength] = useState("");
    const [voterAddress, setvoterAddress] = useState([]);

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

    const createVoter = async (inputForm, fileUrl, router) => {
        try {
            const { name, address, position } = inputForm;
            console.log(name, address, position, fileUrl);

            if (!name || !address || !position) {
                return seterror("Please fill all the fields");
            }

            const age = "20";

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

            const data = JSON.stringify({
                _name: name,
                _age: age,
                _image: fileUrl,
                _ipfs: fileUrl,
                address: address,
            });
            console.log(data);

            const voter = await contract.createVoter(data);
            console.log("5");
            voter.wait();
            console.log("6");
            console.log(voter);

            router.push("/voterList");

        } catch (error) { }
    };
    const votingTitle = "Voting Contract";
    return (
        <VoterContext.Provider
            value={{
                votingTitle,
                createVoter,
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
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
