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
            <div className={Styles.pollList}>
                <div className={Styles.poll__list__heading}>
                    <h2>Created Polls </h2>
                    <Link href="createPoll">
                        <button className={Styles.new__poll__button} type="button">
                            Add a new poll
                        </button>
                    </Link>


                </div>

                <div className={Styles.poll__list__container}>
                    {pollArray.map((poll, index) => (
                        <div key={index} className={Styles.poll__card}>
                            <div className={Styles.poll__card__content}>
                                <p className={Styles.poll__card__title}>{poll.title}</p>
                                <p className={Styles.poll__card__description}>{poll.description}</p>
                                <p className={Styles.poll__card__isActive}></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PollList;
