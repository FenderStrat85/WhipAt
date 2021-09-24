import React from "react";
import "./JoinMeets";
import MeetsList from "./Meets_List";

export default function JoinMeets() {
  const joinMeets = "join";
  return (
    <div>
      <h1>Join Meets</h1>
      <div className="join_meets_cont">
        <MeetsList meetType={joinMeets}></MeetsList>
      </div>
    </div>
  );
}
