import React, { useState, useRef, useCallback, useEffect } from "react";
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

const options = {
  // style:
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMaps (props) {
  const dispatch = useDispatch();

  let center;


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
  const updateMarker = async (event) => {
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    console.log('event in GMAPS', event);
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

  if (loadError) return <p>"Error loading maps"</p>;
  if (!isLoaded) return <p>"Loading Maps"</p>;

  // const render_search_or_display = (search) => {

  const mapOptions = {
    mapContainerStyle,
    zoom: 14,
    center,
    options,
    onLoad: onMapLoad,
  }
  const markerOptions = {
    position: center,
    icon: {
      url: markerImg,
      scaledSize: new window.google.maps.Size(35, 35),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(15, 15),
    }
  }

  if (props.center) {
    console.log('CENTER IF', props.center);

    center = {
      lng: parseFloat(props.center.lng),
      lat: parseFloat(props.center.lat)
    }
  } else {
    center = {
      lng: 80.1918,
      lat: 25.7617,
    };
  }

  if (props.value) {
    mapOptions.mapContainerStyle = mapContainerStyle
    mapOptions.zoom = 8
    mapOptions.center = center
    mapOptions.options = options
    mapOptions.onClick = updateMarker
  } else {
    mapOptions.mapContainerStyle = mapContainerStyle
    mapOptions.zoom = 14
    mapOptions.center = props.center
    mapOptions.options = options
  }

  console.log('mapOptions', mapOptions.center);

  return (
    <div className="google_maps_container_p">
      {props.value &&
        <div className="search_container_g">
          <Search panTo={panTo}></Search>
        </div>
      }
      <GoogleMap {...mapOptions}>
        <Marker
          position={marker}
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
