import React, { useState, useEffect } from "react";
import apiService from "../../utils/ApiService";
import "./FriendBanner.css";

export default function FriendBanner(props) {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(props.friend);
    console.log(state);
  }, []);

  const changeFriendShip = async () => {
    // when this is invoked, either add friend or remove friend will be called
    //if currentFriends then remove from friends
    try {
      if (state.friendShip) {
        const data = await apiService.removeFriend({ friend: state.user_name });
        setState((prevState) => ({
          ...prevState,
          friendShip: data,
        }));
      } else {
        //currently not friend then add as friend
        const data = await apiService.addFriend({ friend: state.user_name });
        setState((prevState) => ({
          ...prevState,
          friendShip: data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayFollowStatus = () => {
    return state.friendShip ? "Unfollow" : "Follow";
  };

  return (
    <div className="friend_banner_cont">
      <div className="picture_cont">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
          alt="profilePictures"
        />
      </div>
      <div className="user_info">
        <p className="user_name">{state.user_name || ""}</p>
        <p className="car_info">{state.make || ""}</p>
        <p className="car_info">{state.model || ""}</p>
      </div>
      <div className="follow_status">
        <button onClick={changeFriendShip}>{displayFollowStatus()}</button>
      </div>
    </div>
  );
}
