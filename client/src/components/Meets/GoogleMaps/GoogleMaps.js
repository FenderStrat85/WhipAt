import React, { useState, useRef, useCallback } from "react";
import markerImg from "../../../images/pistons.png";
import { update_map } from "../../../utils/actions";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import Search from "../GoogleMaps/Search";
import "@reach/combobox/styles.css";
import "./GoogleMaps.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "89vw",
  height: "34vh",
};
let center = {
  lng: 80.1918,
  lat: 25.7617,
};
const options = {
  // style:
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMaps(props) {
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [marker, setMarker] = useState({});

  //on map click the state gets updated
  const updateMarker = async (event) => {
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    dispatch(update_map(marker));
  };

  //ref to the map instance so that we can update it as we search
  const mapRef = useRef();
  //this will allow us to change the map state without causing re renders
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  //function to pan to a map location searched

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const render_search_or_display = (search) => {
    if (search) {
      return (
        <div className="google_maps_container_p">
          <div className="search_container_g">
            <Search panTo={panTo}></Search>
          </div>

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
    } else {
      return (
        <div className="google_maps_container_p">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={props.center}
            options={options}
            onLoad={onMapLoad}
          >
            <Marker
              position={props.center}
              icon={{
                url: markerImg,
                scaledSize: new window.google.maps.Size(35, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            ></Marker>
          </GoogleMap>
          ;
        </div>
      );
    }
  };
  return (
    <div className="google_maps_container_p">
      {render_search_or_display(props.value)}
    </div>
  );
}
