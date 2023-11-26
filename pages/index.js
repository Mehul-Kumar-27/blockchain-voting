import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

import { VoterContext } from "@/context/Voter";
import Styles from "@/styles/index.module.css";
import Card from "@/components/Card/Card";
import Link from "next/link";

const HomePage = () => {



  return (
    <div className="area">
      <div className="circles">
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

      <div className="context">
        <h1 className="title slide-up">Blockchain Voting System</h1>

        <p className="subtitle fade-in">
          Welcome to the Future of Secure and Transparent Voting
        </p>

        <div className="section fade-in">
          <h2 className="section-h2">Project Overview</h2>
          <p className="section-p">
            Our blockchain-based voting system leverages the power of
            decentralized technology to ensure the integrity and transparency of
            elections. By employing a distributed ledger that records each vote
            in a secure and immutable manner, our system eliminates the risk of
            tampering or fraud, providing voters with the confidence that their
            choices will be accurately reflected in the final results.
          </p>
        </div>

        <div className="section fade-in">
          <h2 className="section-h2">Key Features</h2>
          <div className="list-container">
            <p className="list-item">Immutable Voting Records</p>
            <p className="list-item">Decentralized Verification</p>
            <p className="list-item">Enhanced Security through Cryptography</p>
            <p className="list-item">Transparent and Tamper-Proof</p>
            <p className="list-item">Accessible to Authorized Voters</p>
          </div>
        </div>
        <div className="section fade-in">
          <h2 className="section-h2">Why Blockchain Voting?</h2>
          <p className="section-p">
            Traditional voting systems face challenges related to trust,
            security, and transparency. Our blockchain voting system addresses
            these issues by providing a secure and decentralized platform for
            casting and counting votes.
          </p>
        </div>

        {/* <Link href="/allowedVoter"> */}
        <button className="cta-button">Go to Second Page</button>
        {/* </Link> */}
        <Link href="/allowedVoter">
          <button className="cta-button">Register New Voter</button>
        </Link>
      </div>

      <style jsx>{`
        * {
          margin: 0px;
          padding: 0px;
        }

        body {
          font-family: "Exo", sans-serif;
        }

        .area {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .context {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          color: #fff;
        }

        .title {
          font-size: 3em;
          margin-bottom: 20px;
          color: #fff;
        }

        .subtitle {
          font-size: 1.2em;
          margin-bottom: 20px;
        }

        .section {
          max-width: 1000px; /* Adjust this value based on your design */
          margin: 0 auto; /* Center the div horizontally */
          text-align: left; /* Align text inside the div to the left */
        }
        .section-h2{
          font-size: 2em;
          margin-bottom: 20px;
        }
        .section-p{
          font-size: 1em;
          margin-bottom: 20px;
        }
        .list-container {
          display: flex;
          flex-direction: column;
        }

        .list-item {
          font-size: 1em;
          margin-bottom: 20px;
        }

        .list-item::before {
          content: "-";
          margin-right: 8px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          position: absolute;
          display: block;
          list-style: none;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
          animation: animate 25s linear infinite;
          bottom: -150px;
        }

        li:nth-child(1) {
          left: 25%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }

        li:nth-child(2) {
          left: 10%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }

        li:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }

        li:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 18s;
        }

        li:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }

        li:nth-child(6) {
          left: 75%;
          width: 110px;
          height: 110px;
          animation-delay: 3s;
        }

        li:nth-child(7) {
          left: 35%;
          width: 150px;
          height: 150px;
          animation-delay: 7s;
        }

        li:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }

        li:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }

        li:nth-child(10) {
          left: 85%;
          width: 150px;
          height: 150px;
          animation-delay: 0s;
          animation-duration: 11s;
        }

        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }

          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }

        .cta-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          font-size: 1em;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background-color: #45a049;
        }


      `}</style>
    </div>
  );
};

export default HomePage;
