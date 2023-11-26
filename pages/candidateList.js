import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { VoterContext } from "@/context/Voter";

const CandidateList = () => {
  const {candiadateArray, getCandidateList } = useContext(VoterContext);

  useEffect(() => {
    const fetchData = async () => {
      await getCandidateList();
      console.log(candiadateArray);
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="voter-list-container">
      <h2>Candidate List</h2>
      <div className="voter-cards-container">
        {candiadateArray.map((voter, index) => (
          <div key={index} className="voter-card">
            <div className="voter-card-content">
              <p className="voter-card-name">{voter.name}</p>
              <p className="voter-card-address">{voter._address}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .voter-list-container {
          margin-top: 20px;
        }

        .voter-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 2rem;
        }

        .voter-list-container h2{
            line-height: 0.5s;
            color: white;
            text-align: center;
            padding-bottom: 1rem;
            font-family: "Poppins", sans-serif;

          }

        .voter-card {
          background-color: #231e39;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.2);
          color: #fff;
          padding: 16px;
          transition: background-color 0.3s, box-shadow 0.3s;
        }

        .voter-card:hover {
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.3);
        }

        .voter-card-content {
          padding: 10px;
        }

        .voter-card-name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 8px;
          color: #fff;
          font-family: "Poppins", sans-serif;
        }

        .voter-card-address {
          font-size: 1rem;
          color: #fff;
          overflow-wrap: break-word;
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default CandidateList;
