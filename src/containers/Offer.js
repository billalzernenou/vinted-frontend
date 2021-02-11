import { useParams } from "react-router-dom";

const Offer = ({ data, setData }) => {
  const { id } = useParams();

  const offer = data.offers.find((item) => {
    console.log(item);
    return item._id === id;
  });
  console.log(offer);
  return (
    <div className="product container">
      <div className="offer-picture">
        <img
          src={offer.product_pictures[0].url}
          alt={`vetement-${offer.product_name}`}
        />
      </div>
      <div className="offer-cart"></div>
      <div className="offer-cart-cart">
        <div className="offer-name">{offer.product_name} </div>
        <div className="offer-price">{offer.product_price} €</div>
        <div className="offer-brand">{offer.product_details[2].COULEUR} </div>
        <div className="offer-size">{offer.product_details[3].EMPLACEMENT}</div>
        <div className="offer-condition">{offer.product_details[1].ÉTAT} </div>
      </div>
    </div>
  );
};

export default Offer;
