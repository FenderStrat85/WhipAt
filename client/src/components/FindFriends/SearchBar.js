import React, { useState } from "react";
import apiService from "../../utils/ApiService";
const initialState = {
  search_bar: "",
};
export default function SearchBar() {
  const [search, setSearch] = useState(initialState);
  const [userList, setUserList] = useState([]);
  //update private state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("search poop");
    await apiService.searchUsers(search);
    // const resultUserList =
  };

  return (
    <div>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search_bar"
          id="search_bar"
          value={search.search_bar}
          placeholder="Search User"
          onChange={handleChange}
        />

        <button type="submit" className="search_icon">
          Search
        </button>
      </form>
    </div>
  );
}
