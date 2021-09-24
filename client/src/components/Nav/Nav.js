import React from "react";
import { useHistory } from "react-router";
import "./Nav.css";

export default function Nav() {
  const history = useHistory();

  return (
    <div className="nav">
      <div className="search" onClick={() => history.push("/search/users")}>
        Search
      </div>
      <div className="meets" onClick={() => history.push("/meets")}>
        Meets
      </div>
      <div className="profile" onClick={() => history.push("/profile")}>
        Profile
      </div>
    </div>
  );
}
