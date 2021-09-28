import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { meet_info } from "../../utils/actions";
import { useHistory } from "react-router-dom";

import "./Meet.css";

export default function Meet(props) {
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  let history = useHistory();

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

  const onClickGetMeetInfo = () => {
    dispatch(meet_info(state));
    history.push("/meet/info"); //redirect to meet info page
  };

  return (
    <div className="meet_contaner_outer">
      <div className="meet_contaner" onClick={onClickGetMeetInfo}>
        <p className="meet_d">{state.meet_name}</p>
        <p className="meet_name">{state.meet_date}</p>
      </div>
      <div>
        <button onClick={() => props.meetButtonAction(props.meetType, state)}>
          {buttonLabel()}
        </button>
      </div>
    </div>
  );
}
