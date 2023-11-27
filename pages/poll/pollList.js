import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { VoterContext } from "@/context/Voter";
import Styles from "styles/pollList.module.css";
import Button from "@/components/Button/Button";
import Link from "next/link";

const PollList = () => {
    const router = useRouter();
    const { pollArray, getAllPolls } = useContext(VoterContext);

    useEffect(() => {
        const fetchPollData = async () => {
            await getAllPolls();
        };

        fetchPollData();
    }, []);

    return (
        <div className={Styles.pollListContainer}>
            <div className={Styles.headerSection}>
                <h1 className={Styles.pageHeading}>Created Polls</h1>
                <Link href="createPoll">
                    <button className={Styles.newPollButton} type="button">
                        Add a new poll
                    </button>
                </Link>
            </div>


            <div className={Styles.pollListGrid}>
                {pollArray.map((poll, index) => (
                    <Link key={index} href={`/poll/pollDetails?id=${poll._pollId}`} passHref>
                        <div key={index} className={Styles.pollCard}>
                            <div className={Styles.pollCardContent}>
                                <p className={Styles.pollCardTitle}>{poll.title}</p>
                                <p className={Styles.pollCardDescription}>{poll.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PollList;
