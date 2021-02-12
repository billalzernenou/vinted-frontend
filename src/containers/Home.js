import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  // const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-server.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error });
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    "is Loading"
  ) : (
    <div className="container home">
      <div className="offers">
        {data.offers.map((item, index) => {
          let id = item._id;

          return (
            <Link key={index} to={`/offer/${id}`}>
              <div className="offer">
                <div className="offer--product-picture">
                  <img
                    src={item.product_image.secure_url}
                    alt={`vètement-${item.product_name}`}
                  />
                </div>
                <p className="offer--product-name">{item.product_name}</p>
                <p className="offer--product-price">{item.product_price} €</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
