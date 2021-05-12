import React, { useState, useEffect } from "react";
import "../assets/css/Payment.css";
import { useStateValue } from "../ReactContextApi/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import { Link, useHistory } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getTotalPrice } from "../ReactContextApi/Reducer";
import axios from "../axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe(),
    elements = useElements();

  const [error, setError] = useState(null),
    [succeeded, setSucceeded] = useState(false),
    [clientSecret, setClientSecret] = useState(null),
    [processing, setProcessing] = useState(false),
    [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects a total in the currency's sub unit
        url: `payments/create?total=${getTotalPrice(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // payment intent is payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : null);
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout <Link to="/checkout">({basket?.length} items)</Link>
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>React-221B</p>
            <p>Firebase-Baker's Street</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            <FlipMove>
              {basket?.map((b) => (
                <CheckoutProduct
                  id={b.id}
                  title={b.title}
                  img_url={b.img_url}
                  price={b.price}
                  rating={b.rating}
                />
              ))}
            </FlipMove>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  value={getTotalPrice(basket)}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                  prefix={"₹"}
                />
              </div>
              <button disabled={disabled || processing || succeeded}>
                <span>
                  {processing ? <p> processing </p> : <p> Buy Now! </p>}
                </span>
              </button>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
