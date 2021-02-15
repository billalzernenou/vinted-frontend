import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Range, getTrackBackground } from "react-range";

const Home = () => {
  const [data, setData] = useState([]);
  // const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayOrder, setDisplayOrder] = useState("asc");
  const [state, setState] = useState({ values: [0, 500] });
  const [searchInput, setSearchInput] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-server.herokuapp.com/offers?sort=price-${displayOrder}&priceMin=${state.values[0]}&priceMax=${state.values[1]}&title=${searchInput}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error });
      }
    };
    fetchData();
  }, [displayOrder, state.values, searchInput]);

  // display sort offers
  const handleDisplaySort = () => {
    if (displayOrder === "desc") {
      setDisplayOrder("asc");
    } else {
      setDisplayOrder("desc");
    }
  };
  // search input
  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  const handleClickSearchTitle = () => {
    // if (event.charCode === 13) {
    //   setSearchTitle(searchInput);
    // }
    setSearchTitle(searchInput);
  };

  return isLoading ? (
    "is Loading"
  ) : (
    <div className="container home">
      <input
        type="text"
        value={searchInput}
        onChange={(event) => {
          handleChangeSearchInput(event);
          handleClickSearchTitle();
        }}
      />
      <button onClick={handleClickSearchTitle}>Search</button>
      <Range
        step={5}
        min={0}
        max={500}
        allowOverlap={true}
        values={state.values}
        onChange={(values) => setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "40%",
              backgroundColor: "#CCCCCC",
              borderRadius: "5px",
              background: getTrackBackground({
                values: state.values,
                backgroundColor: "#2CB1BA",
                colors: ["#CCCCCC", "#2CB1BA", "#CCCCCC"],
                min: 0,
                max: 500,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              backgroundColor: "#2CB1BA",
              borderRadius: "50%",
              outline: "none",
            }}
          />
        )}
      />
      <output
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
          width: "40%",
        }}
        id="output"
      >
        <div> priceMin : {state.values[0].toFixed(0)}</div>
        <div>priceMax : {state.values[1].toFixed(0)}</div>
      </output>

      <div>
        Trier par prix
        <input type="checkbox" onChange={handleDisplaySort}></input>
      </div>
      {data.offers ? (
        <div className="offers">
          {data.offers.map((item, index) => {
            return (
              <div key={`offer${item._id}`}>
                <Link to={`/offer/${item._id}`}>
                  <div className="offer">
                    <div className="offer--product-picture">
                      <img
                        src={item.product_image.secure_url}
                        alt={`vètement-${item.product_name}`}
                      />
                    </div>
                    <p className="offer--product-name">{item.product_name}</p>
                    <p className="offer--product-price">
                      {item.product_price} €
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "45px",
          }}
        >
          No offers
        </div>
      )}
    </div>
  );
};

export default Home;
