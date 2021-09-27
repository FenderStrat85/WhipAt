import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import MeetsList from "./Meets_List";
import "./Meets.css";

export default function Meets() {
  const history = useHistory();
  const user = useSelector((state) => state.loggedUser);
  const myMeets = "my";
  const joinedMeets = "joined";
  return (
    <div className="car_meets_container">
      <h1>{"Meets" || "no logged inuser"}</h1>
      <div className="meet_create_join_cont">
        <button onClick={() => history.push("/create/meet")}>
          Create Meet
        </button>
        <button onClick={() => history.push("/join/meet")}>Join Meet</button>
      </div>
      <div className="my_meets_container">
        <h3>My Meets</h3>
        <MeetsList meetType={myMeets}></MeetsList>
      </div>
      <div className="joined_meets_container">
        <h3>Joined Meets</h3>
        <MeetsList meetType={joinedMeets}></MeetsList>
      </div>
    </div>
  );
}
