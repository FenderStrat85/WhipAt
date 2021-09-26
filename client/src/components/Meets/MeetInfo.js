import React from "react";
import { useSelector } from "react-redux";

export default function MeetInfo() {
  const meet = useSelector((state) => state.meet_info);

  return (
    <div>
      <h1>{meet.meet_name}</h1>
    </div>
  );
}
