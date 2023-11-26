import React from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { VoterContext } from "@/context/Voter";
import Styles from "../styles/candidateRegistration.module.css";
import addImag from "../assets/images/3.jpg";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";


const CandidateRegistration = () => {
    const router = useRouter();
    const [profileURL, setprofileURL] = useState(null);
    const [inputForm, setinputForm] = useState({
        name: "",
        address: "",
        manifesto: "",
      });
    return (
        <div>
            <p>CandidateRegistration</p>
        </div>
    );
}


export default CandidateRegistration;