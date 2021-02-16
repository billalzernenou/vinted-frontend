import "./App.css";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Publish from "./containers/Publish";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      //if token exist add cookie to the browser and update userToken state
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header userToken={userToken} setUser={setUser} />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/publish">
            <Publish token={userToken} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/Signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
