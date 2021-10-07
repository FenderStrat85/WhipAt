import React, { useState, useRef, useCallback, useEffect, MouseEvent } from "react";
import markerImg from "../../../images/pistons.png";
import { update_map } from "../../../utils/actions";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import "@reach/combobox/styles.css";
import "./GoogleMaps.css";
import { combineReducers } from "redux";
import rootReducer, { RootState } from "../../../utils/reducers";

const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ["places"];

const mapContainerStyle = {
  width: "89vw",
  height: "34vh",
};

const options = {
  // style:
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMaps(props: any) {

  // export default function GoogleMaps(props) {
  const dispatch = useDispatch();

  // Dirty fix, figure out why ApiKey from .env should be a literal
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [marker, setMarker] = useState({});

  useEffect(() => {
    if (Object.keys(marker).length > 0) {
      dispatch(update_map(marker));
    }
  }, [marker])

  //on map click the state gets updated

  const updateMarker = async (event: any) => {

    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };
  interface Location {
    lat: number,
    lng: number
  }

  interface Map {
    lat: number,
    lng: number,
    panTo?: Location,
    setZoom?: (zoom: number) => void
  }

  const ourLocation: Map = { lat: 51, lng: 0 }

  //ref to the map instance so that we can update it as we search
  const mapRef = useRef(ourLocation);

  //this will allow us to change the map state without causing re renders
  const onMapLoad = useCallback(async (map) => {
    mapRef.current = map;
  }, []);

  // REDUX implementation - allows direct access to a particular part of the state - BUGGY!
  // const mapLocations: any = useSelector((state: RootState) => state.mapInfo)

  const mapLocations: any = useSelector((state) => state)

  const panTo = useCallback(({ lat, lng }) => {
    dispatch(update_map({ lat, lng }));
    if (!mapRef.current) {
      return
    }

    mapRef.current.lat = lat;
    mapRef.current.lng = lng;

  }, [mapRef.current]);

  //function to pan to a map location searched

  if (loadError) return <p>"Error loading maps"</p>;
  if (!isLoaded) return <p>"Loading Maps"</p>;

  let center;

  if (props.center) {

    center = {
      lng: parseFloat(props.center.lng),
      lat: parseFloat(props.center.lat)
    }
  } else {

    center = {
      lng: mapRef.current.lng,
      lat: mapRef.current.lat,
    };
  }

  const mapOptions = {
    mapContainerStyle,
    zoom: 14,
    center,
    options,
    onLoad: onMapLoad,
  }

  if (props.value) {
    mapOptions.mapContainerStyle = mapContainerStyle
    mapOptions.zoom = 8
    mapOptions.center = center
    mapOptions.options = options
  } else {
    mapOptions.mapContainerStyle = mapContainerStyle
    mapOptions.zoom = 14
    mapOptions.center = props.center
    mapOptions.options = options
  }

  return (
    <div className="google_maps_container_p">
      {props.value &&
        <div className="search_container_g">
          <Search panTo={panTo}></Search>
        </div>
      }
      <GoogleMap {...mapOptions} onClick={updateMarker} center={props.value ? mapLocations.mapInfo : props.center}>
        <Marker
          position={props.center ? props.center : marker}
          icon={{
            url: markerImg,
            scaledSize: new window.google.maps.Size(35, 35),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      </GoogleMap>
    </div>
  )
}
