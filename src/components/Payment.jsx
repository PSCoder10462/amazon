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
import { EMPTY_BASKET } from "../ReactContextApi/ActionTypes";
import firebase from "../firebase";

const db = firebase.firestore();

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
    getClientSecret();
  }, [basket]);

  console.log(clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = getTotalPrice(basket);

    if (totalPrice !== 0) {
      setProcessing(true);
      // eslint-disable-next-line
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

          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

          dispatch({
            type: EMPTY_BASKET,
          });

          history.replace("/orders");
        });
    } else {
      alert("Not enough items in the cart!");
    }
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
                  key={b.id}
                  inOrder={true}
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
                      <p>
                        <small>
                          Enter "4242424242..." for fake card in all fields
                        </small>
                      </p>
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
