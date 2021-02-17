import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
const CheckoutForm = ({ title, price, userIdToken }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // get the credintials
      const cardElements = elements.getElement(CardElement);
      // req to api stripe to get a token
      const stripeResponse = await stripe.createToken(cardElements, {
        // I used the User Id but i could use the token
        // we can do axios req using the token to get it here too
        name: userIdToken.userIdToken,
      });
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post("http://localhost:4000/pay", {
        stripeToken: stripeToken,
        title: title,
        price: price,
      });

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Acheter</button>
      </form>
      {completed && <span>Le paiment a été validé</span>}
      {/* recap  
      
      
      
      */}
    </div>
  );
};

export default CheckoutForm;
