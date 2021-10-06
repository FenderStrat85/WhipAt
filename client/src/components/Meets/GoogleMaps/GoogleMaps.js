import React, { useState, useRef, useCallback, useEffect } from "react";
import markerImg from "../../../images/pistons.png";
import { update_map } from "../../../utils/actions";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import "@reach/combobox/styles.css";
import "./GoogleMaps.css";

const libraries = ["places"];

// TS ------------------
// const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = ["places"];
// ---------------------

const mapContainerStyle = {
  width: "89vw",
  height: "34vh",
};

const options = {
  // style:
  disableDefaultUI: true,
  zoomControl: true,
};


// TS ----------------------------
// export default function GoogleMaps (props: any) {
// ------------------------------

export default function GoogleMaps (props) {
  const dispatch = useDispatch();


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


  const updateMarker = async (event) => {

    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };
  //on map click the state gets updated
  // USED IN TS
  // const updateMarker = async (event: any) => {
  //   setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  // };

  // TS TYPES --------------------

  // interface Location {
  //   lat: number,
  //   lng: number
  // }

  // interface Map {
  //   lat: number,
  //   lng: number,
  //   panTo?: Location,
  //   setZoom?: (zoom: number) => void
  // }

  // const ourLocation: Map = { lat: 80.1918, lng: 25.7617 }

  //-----------------



  //ref to the map instance so that we can update it as we search
  // TS ------------------------------
  // const mapRef = useRef(ourLocation);
  // --------------------------------
  const mapRef = useRef();
  //this will allow us to change the map state without causing re renders
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // TS ---------------------------------------------
  // const panTo = useCallback(({ lat, lng }) => {

  //   if (!mapRef.current) {
  //     return
  //   }
  //   mapRef.current = { lat, lng };

  //   mapRef.current.panTo = ({ lat, lng })
  //   if (mapRef.current.setZoom) {
  //     mapRef.current.setZoom(14);
  //   }
  // }, [mapRef.current]);
  // ---------------------------------------
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  //function to pan to a map location searched

  if (loadError) return <p>"Error loading maps"</p>;
  if (!isLoaded) return <p>"Loading Maps"</p>;

  let center;
  // TS ----------------------------------
  // if (props.center) {
  //   center = {
  //     lng: parseFloat(props.center.lng),
  //     lat: parseFloat(props.center.lat)
  //   }
  // } else {
  //   center = {
  //     lng: mapRef.current.lng,
  //     lat: mapRef.current.lat,
  //   };
  // }
  //--------------------------------------

  if (props.center) {
    center = {
      lng: parseFloat(props.center.lng),
      lat: parseFloat(props.center.lat)
    }
  } else {
    center = {
      lng: mapRef.current ? mapRef.current.lng : 40,
      lat: mapRef.current ? mapRef.current.lat : 30,
    };
  }

  const mapOptions = {
    mapContainerStyle,
    zoom: 14,
    center,
    options,
    onLoad: onMapLoad,
    //TS ------
    // onclick
    // ------
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

  return (
    <div className="google_maps_container_p">
      {props.value &&
        <div className="search_container_g">
          <Search panTo={panTo}></Search>
        </div>
      }
      <GoogleMap {...mapOptions}>
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
