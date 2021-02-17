import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import OnLoading from "../components/OnLoading";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  // const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://vinted-server.herokuapp.com/offer/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error });
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <OnLoading />
  ) : (
    <div className="offer-container">
      <div className="product container">
        <div className="offer-picture">
          <img
            src={data.product_image.secure_url}
            alt={`vetement-${data.product_name}`}
          />
        </div>
        <div className="offer-cart">
          <div className="offer-cart-cart">
            <div className="offer-price">{data.product_price} €</div>
            <div className="offer-name">{data.product_name} </div>
            <div className="offer-details">
              {data.product_details.map((item, index) => {
                return (
                  <table key={`offer-${Object.keys(item)[0]}}`}>
                    <tbody>
                      <tr className="details-line">
                        <td className="detail-name">{Object.keys(item)[0]}</td>
                        <td className="detail-value">
                          {item[Object.keys(item)[0]]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
          <div>
            <div className="publisher">
              <div className="offer-name">{data.product_name} </div>
              <div className="publisher-avatar">
                {data.owner.account.avatar ? (
                  <img src={data.owner.account.avatar} alt="Avatar"></img>
                ) : (
                  <div className="publisher-avatar-name">
                    {data.owner.account.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="publisher-username">
                  {data.owner.account.username}
                </div>
              </div>
            </div>
          </div>
          <div className="cart-validate">
            <Link
              to={{
                pathname: "/payement",
                state: {
                  title: data.product_name,
                  price: data.product_price,
                },
              }}
            >
              <button className="validate-button">Acheter</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
