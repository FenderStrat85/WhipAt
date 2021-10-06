import React from "react";
import { useSelector } from "react-redux";

import "./MeetInfo.css";
import GoogleMaps from "./GoogleMaps/GoogleMaps";

export default function MeetInfo () {
  const meet = useSelector((state) => state.meet_info);
  const meet_location = JSON.parse(meet.meet_location);

  let center = {
    lng: meet_location.lng,
    lat: meet_location.lat,
  };

  return (
    <div className="meet_info_container">
      <h1>{meet.meet_name}</h1>
      <div className="meet_info_map_contianer">
        <GoogleMaps value={false} center={center}></GoogleMaps>
      </div>
      <p className="meet_info_date">{meet.meet_date}</p>
      <p className="meet_info_description">{meet.meet_description}</p>
    </div>
  );
}
