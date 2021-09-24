import React, { useState, useEffect } from "react";
import apiService from "../../utils/ApiService";
import "./Meet.css";

export default function Meet(props) {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(props.meet);
    console.log(state);
  }, []);

  const buttonAction = async () => {
    if (props.meetType === "my" || props.meetType === "joined") {
      return "Leave Meet";
    } else {
      try {
        await apiService.joinAMeet(state);
      } catch (error) {
        console.log(error);
      }
      return "Join Meet";
    }
  };

  return (
    <div className="meet_contaner">
      <p className="meet_d">{state.meet_name}</p>
      <p className="meet_name">{state.meet_date}</p>
      <button>{buttonAction()}</button>
    </div>
  );
}
