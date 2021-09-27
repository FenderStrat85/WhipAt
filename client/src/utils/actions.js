export const login_action = (user) => ({ type: "LOGGEDIN", payload: user });

export const meet_info = (meet) => ({ type: "MEET_INFO", payload: meet });

export const initial_map = (map) => ({ type: "SET_INITIAL_MAP", payload: map });

export const update_map = (markerLocation) => ({
  type: "SET_NEW_MAP_LOC",
  payload: markerLocation,
});
