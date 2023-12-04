import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { VoterContext } from "@/context/Voter";
import Styles from "styles/casteVotePage.module.css";




const CastVotePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [pollData, setPollData] = useState(null);

    const { verifyVote, voterVotedCandidate, closePoll, castVoteToCandidate, getPollData, detailPoll, getCandidateDataForVoting, candiadateArray } = useContext(VoterContext);

    useEffect(() => {
        const fetchData = async () => {
            await fetchPollData();
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        const candidateData = async () => {
            await fetchCandidateOfPoll();
        }
        candidateData();
    }, [detailPoll]);


    const fetchPollData = async () => {
        console.log("id", id);
        await getPollData(id);
        setPollData(detailPoll);
    };

    const fetchCandidateOfPoll = async () => {
        if (detailPoll) {
            setPollData(detailPoll);
            const candidateAddressList = detailPoll.candidates;
            console.log("candidateAddressList", candidateAddressList);
            await getCandidateDataForVoting(candidateAddressList);

        }
    }

    const castVote = async (candidateAddress, candidateId, pollId) => {
        console.log("candidateAddress", candidateAddress);
        console.log("candidateId", candidateId);
        console.log("pollId", pollId);
        await castVoteToCandidate(candidateAddress, candidateId, pollId);
    }


    const closePollFunction = async () => {
        await closePoll(Number(detailPoll._pollId));
        await fetchPollData()
    }

    const verifyVoteFunction = async () => {
        await verifyVote(Number(detailPoll._pollId));
    }

    return (
        <div className={Styles.CastVotePage}>
            <div className={Styles.CastVotePageHeader}>
                <h1>Cast Your Vote </h1>
                <p>{pollData?.title}</p>
                <p>{pollData?.description}</p>
            </div>

            <div className={Styles.CandidatesAvailable}>
                <div className={Styles.finishVoting}>

                    <h2>Candidates Available</h2>
                    <div className={Styles.finishVotingButton}>
                        {detailPoll && detailPoll.isActive ? (
                            <button
                                className={Styles.CastVoteButton}
                                type="button"
                                onClick={() => closePollFunction()}
                            >
                                Finish Voting
                            </button>
                        ) : (
                            <button
                                className={Styles.CastVoteButton}
                                type="button"
                                onClick={() => { verifyVoteFunction() }}
                            >
                                Verify Vote
                            </button>
                        )}
                    </div>



                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    {voterVotedCandidate ? (
                        <h1>You have voted to {voterVotedCandidate.name}</h1>
                    ) : (
                        <h1></h1>
                    )}
                </div>

                <div className={Styles.CandidateList}>
                    {candiadateArray.map((candidate, index) => (
                        console.log("candidate", candidate.age),
                        <div key={index} className={Styles.CandidateCard}>
                            <div className={Styles.CandidateCardContent}>
                                <p className={Styles.CandidateCardName}>{candidate.name}</p>
                                <p className={Styles.CandidateCardAddress}>{candidate._address}</p>
                                <p className={Styles.CandidateCardAddress}>Manefesto : {candidate.manefesto}</p>
                                {detailPoll && detailPoll.isActive ? (
                                    <p>Voting is ongoing</p>
                                ) : (
                                    <p className={Styles.CandidateCardAddress}>Current Vote Count: {Number(candidate.voteCount)}</p>
                                )}
                                {detailPoll && detailPoll.isActive && (
                                    <button
                                        className={Styles.CastVoteButton}
                                        type="button"
                                        onClick={() => castVote(candidate._address, Number(candidate._candidateId), Number(pollData._pollId))}
                                    >
                                        Cast Vote
                                    </button>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default CastVotePage;