import React, { useState } from "react";
import "./Register.css";
import apiService from "../../utils/ApiService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login_action } from "../../utils/actions";

const initialState = {
  user_name: "",
  password: "",
  user_email: "",
  year: "",
  make: "",
  model: "",
  profile: "",
};
export default function Register() {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

    const name = event.currentTarget.name
    const value = event.currentTarget.value

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const name = event.currentTarget.name
    const value = event.currentTarget.value

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))


  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { user_name, password, user_email, year, make, model, profile } =
      state;
    const newUser = {
      user_name,
      password,
      user_email,
      year,
      make,
      model,
      profile,
    };

    try {
      const user = await apiService.register(newUser);
      dispatch(login_action(user));
      //redirect to meets page
      history.push("/meets");
    } catch (error) {
    }
  };

  const validateForm = () => {
    return (
      !state.user_name ||
      !state.password ||
      !state.user_email ||
      !state.year ||
      !state.make ||
      !state.model ||
      !state.profile
    );
  };

  return (
    <div className="register_container">
      <h2>Register</h2>
      <form className="register_form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_name"
          id="user_name"
          data-testid="user_name"
          value={state.user_name}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          type="password"
          name="password"
          id="password"
          data-testid="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <input
          type="email"
          name="user_email"
          id="user_email"
          data-testid="user_email"
          value={state.user_email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="profile"
          id="profile"
          data-testid="profile"
          value={state.profile}
          onChange={handleChange}
          placeholder="Profile Picture link"
        />

        <select name="year" id="year" data-testid="year" onChange={handleSelectChange}>
          <option value="" disabled>
            Year
          </option>

          <option value="2014">2021</option>
          <option value="2014">2020</option>
          <option value="2014">2019</option>
          <option value="2014">2018</option>
          <option value="2014">2017</option>
          <option value="2014">2016</option>
          <option value="2014">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
          <option value="1998">1998</option>
          <option value="1997">1997</option>
          <option value="1996">1996</option>
          <option value="1995">1995</option>
          <option value="1994">1994</option>
          <option value="1993">1993</option>
          <option value="1992">1992</option>
          <option value="1991">1991</option>
          <option value="1990">1990</option>
        </select>

        <select name="make" id="make" data-testid="make" onChange={handleSelectChange}>
          <option value="" disabled>
            Make
          </option>
          <option value="ACURA">ACURA</option>
          <option value="ASTON MARTIN">ASTON MARTIN</option>
          <option value="AUDI">AUDI</option>
          <option value="BENTLEY">BENTLEY</option>
          <option value="BMW">BMW</option>
          <option value="BUICK">BUICK</option>
          <option value="CADILLAC">CADILLAC</option>
          <option value="CHEVROLET">CHEVROLET</option>
          <option value="CHRYSLER">CHRYSLER</option>
          <option value="DODGE">DODGE</option>
          <option value="FERRARI">FERRARI</option>
          <option value="FORD">FORD</option>
          <option value="GMC">GMC</option>
          <option value="HONDA">HONDA</option>
          <option value="HUMMER">HUMMER</option>
          <option value="HYUNDAI">HYUNDAI</option>
          <option value="INFINITI">INFINITI</option>
          <option value="ISUZU">ISUZU</option>
          <option value="JAGUAR">JAGUAR</option>
          <option value="JEEP">JEEP</option>
          <option value="KIA">KIA</option>
          <option value="LAMBORGHINI">LAMBORGHINI</option>
          <option value="LAND ROVER">LAND ROVER</option>
          <option value="LEXUS">LEXUS</option>
          <option value="LINCOLN">LINCOLN</option>
          <option value="LOTUS">LOTUS</option>
          <option value="MASERATI">MASERATI</option>
          <option value="MAYBACH">MAYBACH</option>
          <option value="MAZDA">MAZDA</option>
          <option value="MERCEDES-BENZ">MERCEDES-BENZ</option>
          <option value="MERCURY">MERCURY</option>
          <option value="MINI">MINI</option>
          <option value="MITSUBISHI">MITSUBISHI</option>
          <option value="NISSAN">NISSAN</option>
          <option value="PONTIAC">PONTIAC</option>
          <option value="PORSCHE">PORSCHE</option>
          <option value="ROLLS-ROYCE">ROLLS-ROYCE</option>
          <option value="SAAB">SAAB</option>
          <option value="SATURN">SATURN</option>
          <option value="SUBARU">SUBARU</option>
          <option value="SUZUKI">SUZUKI</option>
          <option value="TOYOTA">TOYOTA</option>
          <option value="VOLKSWAGEN">VOLKSWAGEN</option>
          <option value="VOLVO">VOLVO</option>
        </select>

        <select name="model" id="model" data-testid="model" onChange={handleSelectChange}>
          <option value="" disabled>
            Model
          </option>
          <option value="COMMANDER">COMMANDER</option>
          <option value="COMPASS">COMPASS</option>
          <option value="GRAND CHEROKEE">GRAND CHEROKEE</option>
          <option value="LIBERTY">LIBERTY</option>
          <option value="PATRIOT">PATRIOT</option>
          <option value="WRANGLER">WRANGLER</option>
        </select>

        <button type="submit" className="form-submit"
          disabled={validateForm()}
        >
          Register
        </button>
      </form>
    </div>
  );
}
