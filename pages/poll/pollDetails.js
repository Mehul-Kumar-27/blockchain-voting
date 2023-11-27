import React, { useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { VoterContext } from "@/context/Voter";
import Styles from "styles/pollDetail.module.css";

const PollDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const address = [];
    const [pollData, setPollData] = useState(null);
    const [availableVotersList, setavailableVotersList] = useState(address);
    const { getPollData, detailPoll, voterAddress, getCandidateAddress, getAllVoterAddress, candidatAddressArrayList, addVoterToPoll, addCandidateToPoll } =
        useContext(VoterContext);
    useEffect(() => {
        const fetchData = async () => {
            await fetchPollData();
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        const voterData = async () => {
            await fetchVoterList();
            // setavailableVotersList(voterAddress);

            voterAddress.map(async (add) => {
                console.log("add", add);
                if (!detailPoll.voters.includes(add)) {
                    availableVotersList.push(add);
                }
            })

            setavailableVotersList(availableVotersList);
        };

        const candidateData = async () => {
            await fetchCandidateList();

            console.log("candidatAddressArrayList", candidatAddressArrayList);
        }

        voterData();
        candidateData();
    }, [detailPoll]);

    const fetchPollData = async () => {
        console.log("id", id);
        await getPollData(id);
        setPollData(detailPoll);
    };

    const fetchVoterList = async () => {
        await getAllVoterAddress();
        console.log("voterAddress", voterAddress);

    };

    const fetchCandidateList = async () => {
        await getCandidateAddress()

    }

    if (!detailPoll) {
        return <h1>Loading...</h1>;
    }

    const handleClickOnVoter = async ({ pollId, address }) => {
        console.log("pollId", pollId);
        console.log("address", address);

        await addVoterToPoll(pollId, address);
    }

    const handleClickOnCandidate = async ({ pollId, address }) => {
        console.log("pollId", pollId);
        console.log("address", address);

        await addCandidateToPoll(pollId, address);
    }

    return (
        <div className={Styles.area}>
            <div className={Styles.circles}>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className={Styles.pollDetailPage}>
                <div className={Styles.availableVoters}>
                    <h3>Available Voters</h3>
                    <div className={Styles.availableVotersList} >
                        {voterAddress.map((voter, index) => (
                            <div className={Styles.voterCard} key={index} onClick={() => handleClickOnVoter({ pollId: Number(detailPoll._pollId), address: voter })}>
                                <p>{voter.slice(0, 25)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={Styles.pollDetailContainer}>
                    <h1>{detailPoll.title}</h1>
                    <p>DESCRIPTION -: {detailPoll.description}</p>
                    <p className={Styles.pollVoterCount}>
                        Voters Registered : {detailPoll.voters.length}
                    </p>
                    <p className={Styles.pollVoterCount}>
                        Candidates Registered : {detailPoll.candidates.length}
                    </p>
                    {/* <Link href="createPoll"> */}
                        <button className={Styles.newPollButton} type="button">
                            Go to Voting Section
                        </button>
                    {/* </Link> */}
                </div>

                <div className={Styles.availableCandidates}>
                    <h3>Available Candidates</h3>
                    <div className={Styles.availableVotersList} >
                        {candidatAddressArrayList.map((add, index) => (
                            <div className={Styles.voterCard} key={index} onClick={() => handleClickOnCandidate({ pollId: Number(detailPoll._pollId), address: add })}>
                                <p>{add.slice(0, 25)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PollDetail;
