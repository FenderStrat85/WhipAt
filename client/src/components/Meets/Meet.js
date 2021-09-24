import React, { useState, useEffect } from "react";
import apiService from "../../utils/ApiService";
import "./Meet.css";

export default function Meet(props) {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(props.meet);
  }, []);

  const buttonLabel = () => {
    if (props.meetType === "my") {
      return "Delete Meet";
    } else if (props.meetType === "joined") {
      return "Leave Meet";
    } else {
      return "Join Meet";
    }
  };

  return (
    <div className="meet_contaner">
      <p className="meet_d">{state.meet_name}</p>
      <p className="meet_name">{state.meet_date}</p>
      <button onClick={() => props.meetButtonAction(props.meetType, state)}>
        {buttonLabel()}
      </button>
    </div>
  );
}
