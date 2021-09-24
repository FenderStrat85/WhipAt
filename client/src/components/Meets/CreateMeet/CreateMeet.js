import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import apiService from "../../../utils/ApiService";
import "./CreateMeet.css";

const initialState = {
  meet_name: "",
  meet_date: "",
  meet_description: "",
  meet_location: "",
  disable_form: true,
};

export default function CreateMeet() {
  const [state, setState] = useState(initialState);
  const history = useHistory();

  //update private state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { meet_name, meet_date, meet_description, meet_location } = state;
    const newMeet = {
      meet_name,
      meet_date,
      meet_description,
      meet_location,
    };

    //send new meet to db, potentialy do not need to create in store
    apiService
      .createMeet(newMeet)
      .then(history.push("/meets"))
      .catch(console.log("error creating"));
  };

  function validateForm() {
    setState((prevState) => ({
      ...prevState,
      disable_form:
        !state.meet_name ||
        !state.meet_date ||
        !state.meet_description ||
        !state.meet_location,
    }));
  }
  useEffect(() => {
    validateForm();
  }, [
    state.meet_name,
    state.meet_date,
    state.meet_description,
    state.meet_location,
  ]);

  return (
    <div>
      <h1>Create Meet</h1>

      <form className="create_meet_form" onSubmit={handleSubmit}>
        <label htmlFor="meet_name">Meet Name</label>
        <input
          type="text"
          name="meet_name"
          id="meet_name"
          onChange={handleChange}
        />

        <label htmlFor="meet_date">Meet Date</label>
        <input
          type="datetime-local"
          name="meet_date"
          id="meet_date"
          onChange={handleChange}
        />

        <label htmlFor="meet_description">Meet Description</label>
        <input
          type="text"
          name="meet_description"
          id="meet_description"
          onChange={handleChange}
        />

        <label htmlFor="meet_location">Meet Location</label>
        <input
          type="text"
          name="meet_location"
          id="meet_location"
          onChange={handleChange}
        />

        <button type="submit" disabled={state.disable_form}>
          Create Meet
        </button>
      </form>
    </div>
  );
}
