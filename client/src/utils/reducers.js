import { combineReducers } from "redux";

const loggedUser = (
  state = {
    user_name: "",
    password: "",
    user_email: null,
    year: null,
    make: null,
    model: null,
    _id: null,
    follower_count: null,
    following_count: null,
    profile: null,
  },
  action
) => {
  if (action.type === "LOGGEDIN") {
    const newState = {
      ...state,
      user_name: action.payload.user_name,
      password: action.payload.password,
      user_email: action.payload.user_email,
      year: action.payload.year,
      make: action.payload.make,
      model: action.payload.model,
      _id: action.payload._id,
      follower_count: action.payload.follower_count,
      following_count: action.payload.following_count,
      profile: action.payload.profile,
    };
    return newState;
  }
  return state;
};

const meet_info = (
  state = {
    createdAt: "",
    creator_id: "",
    meet_date: "",
    meet_description: "",
    meet_location: "",
    meet_name: "",
    updatedAt: "",
    _id: "",
  },
  action
) => {
  if (action.type === "MEET_INFO") {
    const newState = {
      ...state,
      createdAt: action.payload.createdAt,
      creator_id: action.payload.creator_id,
      meet_date: action.payload.meet_date,
      meet_description: action.payload.meet_description,
      meet_location: action.payload.meet_location,
      meet_name: action.payload.meet_name,
      updatedAt: action.payload.updatedAt,
      _id: action.payload._id,
    };
    return newState;
  }
  return state;
};

const mapInfo = (state = { lat: 0, lng: 0 }, action) => {
  if (action.type === "SET_NEW_MAP_LOC") {
    const newState = {
      ...state,
      lat: action.payload.lat,
      lng: action.payload.lng,
    };
    console.log("newState", newState);
    return newState;
  }

  return state;
};

const reducers = combineReducers({
  loggedUser,
  meet_info,
  mapInfo,
});

export default reducers;
