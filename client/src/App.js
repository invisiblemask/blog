import SinglePost from "./components/singlePost/SinglePost";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register"> { user ? <Home /> : <Register /> } </Route>
        <Route path="/login"> {user ? <Home /> : <Login />} </Route>
        <Route path="/settings"> {user ? <Settings /> : <Login />} </Route>
        <Route path="/create"> {user ? <Create /> : <Login />} </Route>
        <Route path="/post/:postId">
          <SinglePost />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
