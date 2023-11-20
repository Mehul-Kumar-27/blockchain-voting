import React from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) => new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);

export const VoterContext = React.createContext();

export const VotingProvider = ({ children }) => {
    const votingTitle = "Voting Contract"
    return <VoterContext.Provider value={{}}>{children}</VoterContext.Provider>;
};

const Voter = () => {
    return <div></div>;
};

export default Voter;
