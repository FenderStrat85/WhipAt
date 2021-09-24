import React, { useState } from "react";
import apiService from "../../utils/ApiService";
import "./SearchBar.css";
const initialState = {
  search_bar: "",
};
export default function SearchBar(props) {
  const [search, setSearch] = useState(initialState);

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
    const resultUserList = await apiService.searchUsers(search);
    props.setUserList(resultUserList);
  };

  return (
    <div>
      <form className="input" onSubmit={handleSubmit}>
        <input
          className="field"
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
