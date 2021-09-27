import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import markerImg from "../../images/pistons.png";

const libraries = ["places"];
const mapContainerStyle = {
  width: "95vw",
  height: "40vh",
};

const options = {
  // style:
  disableDefaultUI: true,
  zoomControl: true,
};

export default function MeetInfo() {
  const meet = useSelector((state) => state.meet_info);
  const meet_location = JSON.parse(meet.meet_location);

  let center = {
    lng: meet_location.lat,
    lat: meet_location.lng,
  };

  console.log(meet_location);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const mapRef = useRef();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // console.log("meetinfo", meet_location);
  return (
    <div>
      <h1>{meet.meet_name}</h1>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        // onLoad={onMapLoad}
      >
        <Marker
          position={center}
          icon={{
            url: markerImg,
            scaledSize: new window.google.maps.Size(35, 35),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        ></Marker>
      </GoogleMap>
    </div>
  );
}
