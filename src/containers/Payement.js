import { Redirect, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutFrom";
const Payement = ({ userIdToken }) => {
  const location = useLocation();
  const { title, price } = location.state;
  // stripe
  const stripePromise = loadStripe(
    "pk_test_51ILYAlJYfmEoEUoUX19KzdSBbCC9QupsjXKOJJUxDaPcoNHrDMS1ItbL2O85i1s5dz4m6BHAJX55pmRMfhCYr7Mr00dpO5K6d4"
  );
  console.log(userIdToken);
  return userIdToken ? (
    <div className="payement">
      <h1>Résumé de la commande</h1>
      <div className="payement-fees">
        <div>Commande : {title}</div>
        <div>prix : {price}</div>
        <div>Frais Protection acheteurs: 0.40 €</div>
        <div>Frais de port: 0.80 €</div>
      </div>
      <div className="payement-pay">
        <div>Total</div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              title={title}
              price={price}
              userIdToken={userIdToken}
            />
          </Elements>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: "login", state: { fromPayement: true } }} />
  );
};

export default Payement;
