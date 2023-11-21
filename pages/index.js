import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

import { VoterContext } from "@/context/Voter";
import Styles from "@/styles/index.module.css";
import Card from "@/components/Card/Card";

const Home = () => {

  const { votingTitle } = useContext(VoterContext);
  return (
    <div>
      <p>{votingTitle}</p>
    </div>
  );
}

export default Home;