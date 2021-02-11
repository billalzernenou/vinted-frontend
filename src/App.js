import "./App.css";
import axios from "axios";
import Home from "./containers/Home";
import Offer from "./containers/Offer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  // const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    "is Loading"
  ) : (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/offer/:id">
            <Offer data={data} setData={setData} />
          </Route>
          <Route path="/">
            <Home data={data} setData={setData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
