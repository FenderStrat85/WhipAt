import React, { useState, useRef, useCallback } from "react";
import markerImg from "../../images/pistons.png";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatlng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "95vw",
  height: "40vh",
};
const center = {
  lat: 25.7617,
  lng: 80.1918,
};
const options = {
  // style:
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [marker, setMarker] = useState({});

  //on map click the state gets updated
  const updateMarker = async (event) => {
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  //ref to the map instance so that we can update it as we search
  const mapRef = useRef();
  //this will allow us to change the map state without causing re renders
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={updateMarker}
        onLoad={onMapLoad}
      >
        <Marker
          position={marker}
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
