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
    console.log(action.payload, "hello");
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
    console.log(newState, "reducer");
    return newState;
  }

  return state;
};

const dummyReducer = (state = 0, action) => {
  return state;
};
const reducers = combineReducers({
  loggedUser,
  dummyReducer,
});

export default reducers;
