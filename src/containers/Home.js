import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../components/Search";
import Hero from "../components/Hero";
import OnLoading from "../components/OnLoading";

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
    <OnLoading />
  ) : (
    <div className="home">
      <div className="container">
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
      </div>
      <Hero />
      {data.offers ? (
        <div className=" container offers">
          {data.offers.map((item, index) => {
            return (
              <div className="offer" key={`offer${item._id}`}>
                {/* publisher */}
                <div className="publisher">
                  <div className="publisher-avatar">
                    {item.owner.account.avatar ? (
                      <img src={item.owner.account.avatar} alt="Avatar"></img>
                    ) : (
                      <div className="publisher-avatar-name">
                        {item.owner.account.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="publisher-username">
                      {item.owner.account.username}
                    </div>
                  </div>
                </div>

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
