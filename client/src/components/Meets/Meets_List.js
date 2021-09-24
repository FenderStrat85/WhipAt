import React, { useState, useEffect } from "react";
import apiService from "../../utils/ApiService";
import "./Meets_List.css";
import Meet from "./Meet";

export default function MeetsList(props) {
  //takes a prop that defines what type of list it will render joined, to join, my meets
  const [state, setState] = useState([]);

  const getMeets = async () => {
    const meet_list = await apiService.getMeets(props.meetType);
    console.log("meet_list", meet_list);
    setState(meet_list);
  };

  const meetButtonAction = async (action, meet) => {
    try {
      console.log("action", action);

      if (action === "my") {
        return "";
      } else if (action === "joined") {
        await apiService.leaveAMeet(meet);
        getMeets();
      } else {
        await apiService.joinAMeet(meet);
        getMeets();
      }
    } catch (error) {}
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
              <Meet
                meet={meet}
                meetType={props.meetType}
                meetButtonAction={meetButtonAction}
              ></Meet>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
