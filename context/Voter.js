import React, { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";

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
    const votingTitle = "Voting Contract";
    return <VoterContext.Provider value={{ votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS }}>{children}</VoterContext.Provider>;
};

const Voter = () => {
    return <div></div>;
};

export default Voter;
