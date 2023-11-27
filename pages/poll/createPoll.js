import React, { useContext, useState } from "react";
import Styles from "styles/createPoll.module.css";
import { VoterContext } from "@/context/Voter";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useRouter } from "next/router";




const CreatePoll = () => {
    const { createNewPoll } = useContext(VoterContext);
    const router = useRouter();
    const [inputForm, setinputForm] = useState({
        title: "",
        description: "",
        // startDate: "",
        // endDate: "",
    });

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

            <div className={Styles.createPoll}>
                <h1>
                    Create A New Poll
                </h1>


                <div className={Styles.createPoll__form}>
                    <Input
                        inputType="text"
                        title="Title"
                        placeholder="Enter the title of the poll"
                        handleClick={(e) =>
                            setinputForm({ ...inputForm, title: e.target.value })
                        }
                    />
                    <Input
                        inputType="text"
                        title="Description"
                        placeholder="Enter the description of the poll"
                        handleClick={(e) =>
                            setinputForm({ ...inputForm, description: e.target.value })
                        }
                    />

                    <div className={Styles.Button}>
                        <Button btnName="Authorize" handleClick={() => createNewPoll(inputForm, router)} />
                    </div>
                </div>
            </div>

        </div>
    )

};



export default CreatePoll;