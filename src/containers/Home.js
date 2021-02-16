import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Hero from "../components/Hero";

const Home = () => {
  const [data, setData] = useState([]);
  // const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayOrder, setDisplayOrder] = useState("asc");
  const [state, setState] = useState({ values: [0, 500] });
  const [searchInput, setSearchInput] = useState("");
  const [rangeFilter, setRangeFilter] = useState({ values: [0, 500] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-server.herokuapp.com/offers?sort=price-${displayOrder}&priceMin=${rangeFilter.values[0]}&priceMax=${rangeFilter.values[1]}&title=${searchInput}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error });
      }
    };
    fetchData();
  }, [displayOrder, rangeFilter.values, searchInput]);

  return isLoading ? (
    "is Loading"
  ) : (
    <div className="container home">
      <Search
        state={state}
        setState={setState}
        rangeFilter={rangeFilter}
        setRangeFilter={setRangeFilter}
        displayOrder={displayOrder}
        setDisplayOrder={setDisplayOrder}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      {data.offers ? (
        <div className="offers">
          {data.offers.map((item, index) => {
            return (
              <div className="offer" key={`offer${item._id}`}>
                <Link to={`/offer/${item._id}`}>
                  <div className="offer-product-picture">
                    <img
                      src={item.product_image.secure_url}
                      alt={`vètement-${item.product_name}`}
                    />
                  </div>
                  <div className="offer-details">
                    <p className="offer-product-price">
                      {item.product_price} €
                    </p>
                    <p className="offer-product-name">{item.product_name}</p>
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
