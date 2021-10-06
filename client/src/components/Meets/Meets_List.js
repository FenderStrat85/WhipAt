import React, { useState, useEffect } from "react";
import apiService from "../../utils/ApiService";
import "./Meets_List.css";
import Meet from "./Meet";

export default function MeetsList (props) {
  //takes a prop that defines what type of list it will render joined, to join, my meets
  const [state, setState] = useState([]);

  const getMeets = async () => {
    const meet_list = await apiService.getMeets(props.meetType);
    setState(meet_list);
  };

  const meetButtonAction = async (action, meet) => {
    try {

      if (action === "my") {
        await apiService.deleteMyMeet(meet);
        await getMeets();
      } else if (action === "joined") {
        //leave meet
        await apiService.leaveAMeet(meet);
        await getMeets();
      } else if (action === "join") {
        //join meet
        await apiService.joinAMeet(meet);
        await getMeets();
      }
    } catch (error) { }
  };

  useEffect(() => {
    getMeets();
  }, []);

  return (
    <div >
      <ul>
        {state.map((meet) => {
          return (
            <li key={meet._id} >
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
