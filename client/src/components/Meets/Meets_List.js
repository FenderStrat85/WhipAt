import React, { useState, useEffect } from "react";
import apiService from "../../utils/ApiService";
import "./Meets_List.css";
import Meet from "./Meet";

export default function MeetsList(props) {
  //takes a prop that defines what type of list it will render joined, to join, my meets
  const [state, setState] = useState([]);

  const getMeets = async () => {
    const meet_list = await apiService.getMeets(props.meetType);
    setState(meet_list);
  };

  useEffect(() => {
    getMeets();
  }, []);

  return (
    <div>
      <ul>
        {state.map((meet) => {
          return (
            <li key={meet.CarMeetId}>
              <Meet meet={meet} meetType={props.meetType}></Meet>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
