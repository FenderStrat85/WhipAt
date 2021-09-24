import React, { useState, useEffect } from "react";
import "./Login.css";
import apiService from "../../utils/ApiService";
import { useDispatch } from "react-redux";
import { login_action } from "../../utils/actions";
import { useHistory, Link } from "react-router-dom";

const initialState = {
  user_name: "",
  password: "",
  disable_form: true,
};

export default function Login() {
  const [state, setState] = useState(initialState);

  //dispatch
  const dispatch = useDispatch();
  let history = useHistory();

  //update private state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //api call and update store on input submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_name, password } = state;
    console.log(state);
    const newUser = { user_name, password };
    try {
      const user = await apiService.login(newUser);
      console.log(user);
      dispatch(login_action(user));
      //redirect to meets page
      history.push("/meets");
    } catch (error) {
      console.log(error);
    }
  };

  function validateForm() {
    setState((prevState) => ({
      ...prevState,
      disable_form: !state.user_name || !state.password,
    }));
  }
  useEffect(() => {
    validateForm();
  }, [state.user_name, state.password]);

  return (
    <div className="login_cont">
      <h1>Login</h1>
      <form className="form_login" onSubmit={handleSubmit}>
        <label htmlFor="user_name">Username</label>
        <input
          type="text"
          name="user_name"
          id="user_name"
          value={state.user_name}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={state.disable_form}>
          Login
        </button>
      </form>
      <div class="create_account">
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
}
