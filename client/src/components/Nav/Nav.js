import React from "react";
import { useHistory } from "react-router";
import "./Nav.css";
import searchIcon from "../../images/search.png";
import carMeetIcon from "../../images/traffic-jam.png";
import carProfileIcon from "../../images/front-car.png";

export default function Nav() {
  const history = useHistory();

  return (
    <div className="nav">
      <div className="search" onClick={() => history.push("/search/users")}>
        <img src={searchIcon} alt="search for user" />
      </div>
      <div className="meets" onClick={() => history.push("/meets")}>
        <img src={carMeetIcon} alt="search for user" />
      </div>
      <div className="profile" onClick={() => history.push("/profile")}>
        <img src={carProfileIcon} alt="search for user" />
      </div>
    </div>
  );
}
