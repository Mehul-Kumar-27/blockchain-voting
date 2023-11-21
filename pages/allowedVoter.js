import React, { useState, useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VoterContext } from "@/context/Voter";
import Styles from "@/styles/allowedVoterList.module.css";
import addImag from "../assets/images/3.jpg";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const allowedVoter = () => {
    const router = useRouter();
    const [fileUrl, setfileUrl] = useState(null);
    const [inputForm, setinputForm] = useState({
        name: "",
        address: "",
        postion: "",
    });

    const { uploadToIPFS } = useContext(VoterContext);

    /// OBTAIN THE INFURA URL

    const onDropUploadToInfura = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        try {
            const added = await uploadToIPFS(file);
            //setfileUrl(`https://ipfs.infura.io/ipfs/${added.path}`);
            setfileUrl(added);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }, []);

    const onDrop = useCallback(async (acceptedFiles) => {
        // Do something with the files
        console.log("Accepting files");
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: { onDrop },
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },

        maxSize: 50000000,
    });

    const handleImageClick = () => { };

    return (
        <div className={Styles.createVoter}>
            <div>
                {fileUrl && (
                    <div className={Styles.voterInfo}>
                        <img src={fileUrl} alt="Voter Image" />
                        <div className={Styles.voterInfo__paragraph}>
                            <p>
                                Name: <span>Mehul Kumar; {inputForm.name}</span>
                            </p>
                            <p>
                                Address: <span>{inputForm.address.slice(0, 20)}</span>
                            </p>
                            <p>
                                Position: <span>{inputForm.postion}</span>
                            </p>
                        </div>
                    </div>
                )}

                {!fileUrl && (
                    <div className={Styles.sideInfo}>
                        <div className={Styles.sideInfoBox}>
                            <h4>Create Candidate For Voting</h4>
                            <p>BlockChain Voting System, Based on Ethereum Blockchain</p>
                            <p className={Styles.sideInfoParagraph}>Contract Candidate</p>
                            <div className={Styles.sideInfoCard}>
                                {/* {voterArray.map((voter, index) => {
                                    <div key={index + 1} className={Styles.card_box}>
                                        <div className={Styles.image}>
                                            <img src="" alt="Profile Photo" />

                                        </div>
                                        <div className={Styles.card_info}>
                                            <p>Name</p>
                                            <p>Address</p>
                                            <p>Details</p>
                                        </div>
                                    </div>
                                })} */}
                            </div>
                        </div>
                    </div>
                )}

                <div className={Styles.voter}>
                    <div className={Styles.voter__container}>
                        <h1>Create New Voter</h1>
                        <div className={Styles.voter__container__box}>
                            <div className={Styles.voter__container__box__div}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    <div className={Styles.voter__container__box__div__info}>
                                        <p>Upload file: JPG, PNG, JPEG, GIF, SVG</p>
                                        <div className={Styles.voter__container__box__div__image}>
                                            <Image
                                                src={addImag}
                                                width={150}
                                                height={150}
                                                alt="File Upload"
                                                priority
                                            />
                                        </div>
                                        <p>Drag and drop your file here</p>
                                        <p>Browse Media</p>
                                    </div>
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
                        placeholder="Voter Address"
                        handleClick={(e) =>
                            setinputForm({ ...inputForm, address: e.target.value })
                        }
                    />
                    <Input
                        inputType="text"
                        title="Position"
                        placeholder="Voter Position"
                        handleClick={(e) =>
                            setinputForm({ ...inputForm, postion: e.target.value })
                        }
                    />
                    <div className={Styles.Button}>
                        <Button btnName="Authorised" handleClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default allowedVoter;
