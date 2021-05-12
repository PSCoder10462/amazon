import React from "react";
import "../assets/css/Payment.css";
import { useStateValue } from "../ReactContextApi/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import { Link } from "react-router-dom";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
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
          <div className="payment__details">{/* stripe MAGIX */}</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
