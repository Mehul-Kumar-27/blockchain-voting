import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { VoterContext } from "@/context/Voter";
import Styles from "styles/pollDetail.module.css";

const PollDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState(null);
    const [availableVotersList, setavailableVotersList] = useState();
    const { getPollData, detailPoll, voterArray, getVoterList } = useContext(VoterContext);
    useEffect(() => {
        const fetchPollData = async () => {
            console.log("id", id);
            await getPollData(id);
            setPollData(detailPoll);
        };

        const fetchVoterList = async () => { 
            await getVoterList();
            
        };

        if (id) {
            fetchPollData();
        }
    }, []);

    if (!detailPoll) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className={Styles.pollDetailPage}>
            <div className={Styles.availableVoters}></div>
            <div className={Styles.pollDetailContainer}>
                <h1>{detailPoll.title}</h1>
                <p>{detailPoll.description}</p>
                <p className={Styles.pollVoterCount}>
                    Voters Registered : {detailPoll.voters.length}
                </p>
                <p className={Styles.pollVoterCount}>
                    Candidates Registered : {detailPoll.candidates.length}
                </p>
            </div>

            <div className={Styles.availableCandidates}></div>
        </div>
    );
};

export default PollDetail;
