const BASE_URL = "http://localhost:3001";

const apiService = {};

apiService.register = async (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.login = async (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.createMeet = async (meet) => {
  return fetch(`${BASE_URL}/create/meet`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meet),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getMeets = async (meetType) => {
  return fetch(`${BASE_URL}/${meetType}/meets`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.joinAMeet = async (meet) => {
  fetch(`${BASE_URL}/join/meets`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meet),
  })
    // .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.leaveAMeet = async (meet) => {
  return fetch(`${BASE_URL}/leave/meets`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meet),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.searchUsers = async (search) => {
  return fetch(`${BASE_URL}/search/users`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(search),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.addFriend = async (friend) => {
  return fetch(`${BASE_URL}/search/addFriend`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(friend),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.removeFriend = async (friend) => {
  return fetch(`${BASE_URL}/search/removeFriend`, {
    method: "DELETE",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(friend),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;
