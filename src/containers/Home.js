import { Link } from "react-router-dom";

const Home = ({ data, setData }) => {
  return (
    <div className="container home">
      <div className="offers">
        {data.offers.map((item, index) => {
          let id = item._id;

          return (
            <Link key={index} to={`/offer/${id}`}>
              <div className="offer">
                <div className="offer--product-picture">
                  <img
                    src={item.product_pictures[0].url}
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
