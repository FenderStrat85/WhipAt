import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Profile() {
  // const [user, setUser] = useState({});
  let history = useHistory();
  const user = useSelector((state) => state.loggedUser);

  return (
    <div>
      <h1>{user.user_name || "no user"}</h1>
      <div className=""></div>
    </div>
  );
}
