import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messagers from "./pages/messagers/Messagers"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Switch, // instead of "Switch"
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
           {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">
           {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
           {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messager">
           <Messagers />
        </Route>
        <Route path="/profile/:username">
           <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
