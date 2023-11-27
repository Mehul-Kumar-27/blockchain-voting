import React, { useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VoterContext } from "@/context/Voter";
import Styles from "styles/candidateRegistration.module.css";
import addImag from "assets/images/3.jpg";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const CandidateRegistration = () => {
    const router = useRouter();

    const { addCandidate } = useContext(VoterContext);
    const [profileURL, setprofileURL] = useState(null);
    const [inputForm, setinputForm] = useState({
        name: "",
        address: "",
        manifesto: "",
        age: "",
        email: "",
        pincode: "",
    });

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log(file.name);
        console.log(URL.createObjectURL(file));
        setprofileURL(URL.createObjectURL(file));
        console.log(profileURL);
    }, []);


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },

        maxSize: 5000000000000,
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
            <div>
                <div className={Styles.register__candidate}>
                    <h1>
                        Register a New Candidate
                    </h1>
                </div>

                <div className={Styles.candidate}>
                    <div className={Styles.candidate__container}>
                        <h1>Create New Candidate</h1>
                        <div className={Styles.candidate__container__box}>
                            <div className={Styles.candidate__container__box__div}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    <div className={Styles.candidate__container__box__div__info}>
                                        <p>Upload file: JPG, PNG, JPEG, GIF, SVG</p>
                                        <div className={Styles.candidate__container__box__div__image}>
                                            {!profileURL && <Image
                                                src={addImag}
                                                width={150}
                                                height={150}
                                                alt="File Upload"
                                                priority
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50px",
                                                }}
                                            />}
                                            {profileURL && <Image
                                                src={profileURL}
                                                width={150}
                                                height={150}
                                                alt="File Upload"
                                                priority
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50px",
                                                    maxWidth: "150px", // Set a maximum width
                                                    maxHeight: "150px", // Set a maximum height
                                                }}
                                            />}

                                        </div>
                                        <p>Drag and drop your file here</p>
                                        <p>Browse Media</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Styles.input__container}>
                        <Input
                            inputType="text"
                            title="Name"
                            placeholder="Voter Name"
                            handleClick={(e) =>
                                setinputForm({ ...inputForm, name: e.target.value })
                            }
                        />
                        <Input
                            inputType="text"
                            title="Address"
                            placeholder="Voter wallet Address"
                            handleClick={(e) =>
                                setinputForm({ ...inputForm, address: e.target.value })
                            }
                        />
                        <Input
                            inputType="text"
                            title="Manifesto"
                            placeholder="A short manifesto"
                            handleClick={(e) =>
                                setinputForm({ ...inputForm, manifesto: e.target.value })
                            }
                        />
                        <Input
                            inputType="number"
                            title="Age"
                            placeholder="Enter the age of the candidate"
                            handleClick={(e) =>
                                setinputForm({ ...inputForm, age: e.target.value })
                            }
                        />
                        <Input
                            inputType="text"
                            title="Address PINCODE"
                            placeholder="PINCODE of Residence"
                            handleClick={(e) =>
                                setinputForm({ ...inputForm, pincode: e.target.value })
                            }
                        />
                        <Input
                            inputType="text"
                            title="Email"
                            placeholder="Enter the email of the candidate"
                            handleClick={(e) =>
                                setinputForm({ ...inputForm, email: e.target.value })
                            }
                        />
                        <div className={Styles.Button}>
                            <Button btnName="Authorize" handleClick={() => addCandidate(inputForm, profileURL, router)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateRegistration;
