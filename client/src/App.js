import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Meets from "./components/Meets/Meets";
import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav/Nav";
import CreateMeet from "./components/Meets/CreateMeet/CreateMeet";
import JoinMeets from "./components/Meets/JoinMeets";
import FindFriends from "./components/FindFriends/FindFriends";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login></Login>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/meets">
            <Meets></Meets>
            <div className="nav_container">
              <Nav></Nav>
            </div>
          </Route>
          <Route exact path="/profile">
            <Profile></Profile>
            <div className="nav_container">
              <Nav></Nav>
            </div>
          </Route>
          <Route exact path="/create/meet">
            <CreateMeet></CreateMeet>
            <div className="nav_container">
              <Nav></Nav>
            </div>
          </Route>
          <Route exact path="/join/meet">
            <JoinMeets></JoinMeets>
            <div className="nav_container">
              <Nav></Nav>
            </div>
          </Route>
          <Route exact path="/search/users">
            <FindFriends></FindFriends>
            <div className="nav_container">
              <Nav></Nav>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
