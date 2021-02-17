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
import Payement from "./containers/Payement";

function App() {
  //token authentification
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userIdToken, setUserIdToken] = useState(
    Cookies.get("userIdToken") || null
  );

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
  const setUserId = (idToken) => {
    if (idToken) {
      //if token exist add cookie to the browser and update userToken state
      Cookies.set("userIdToken", idToken, { expires: 7 });
      setUserIdToken(idToken);
    } else {
      Cookies.remove("userIdToken");
      setUserIdToken(null);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header userToken={userToken} setUser={setUser} setUserId={setUserId} />

        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/publish">
            <Publish token={userToken} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} setUserId={setUserId} />
          </Route>
          <Route path="/Signup">
            <Signup setUser={setUser} setUserId={setUserId} />
          </Route>
          <Route path="/payement">
            <Payement userIdToken={userIdToken} />
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
