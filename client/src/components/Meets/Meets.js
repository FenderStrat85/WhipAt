import React from "react";
import { useHistory } from "react-router";
import MeetsList from "./Meets_List";
import "./Meets.css";

export default function Meets() {
  const history = useHistory();
  const myMeets = "my";
  const joinedMeets = "joined";
  return (
    <div className="car_meets_container">
      <h1>{"Meets" || "no logged user"}</h1>
      <div className="meet_create_join_cont">
        <button onClick={() => history.push("/create/meet")}>
          Create Meet
        </button>
        <button onClick={() => history.push("/join/meet")}>Join Meet</button>
      </div>
      <div className="all_car_meets_cont">
        <div className="my_meets_container">
          <h3>My Meets</h3>
          <MeetsList meetType={myMeets}></MeetsList>
        </div>
        <div className="joined_meets_container">
          <h3>Joined Meets</h3>
          <MeetsList meetType={joinedMeets}></MeetsList>
        </div>
      </div>
    </div>
  );
}
