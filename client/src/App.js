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
import MeetInfo from "./components/Meets/MeetInfo";

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/meets">
            <Meets />
            <div className="nav_container">
              <Nav />
            </div>
          </Route>
          <Route exact path="/profile">
            <Profile />
            <div className="nav_container">
              <Nav />
            </div>
          </Route>
          <Route exact path="/create/meet">
            <CreateMeet />
            <div className="nav_container">
              <Nav />
            </div>
          </Route>
          <Route exact path="/join/meet">
            <JoinMeets />
            <div className="nav_container">
              <Nav />
            </div>
          </Route>
          <Route exact path="/search/users">
            <FindFriends />
            <div className="nav_container">
              <Nav />
            </div>
          </Route>
          <Route exact path="/meet/info">
            <MeetInfo />
            <div className="nav_container">
              <Nav />
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
