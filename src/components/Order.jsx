import React from "react";
import "../assets/css/Order.css";
import moment from "moment";
import FlipMove from "react-flip-move";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ data, orderId }) {
  const { amount, basket, created } = data;
  const { id, img_url, price, rating, title } = basket;
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <strong>Order Id: </strong>
        <small>{orderId}</small>
      </p>
      <FlipMove>
        {basket?.map((b) => (
          <CheckoutProduct
            key={b.id}
            title={b.title}
            price={b.price}
            rating={b.rating}
            img_url={b.img_url}
            id={b.id}
            inOrder={false}
          />
        ))}
      </FlipMove>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total: {value}</h3>
          </>
        )}
        value={amount / 100}
        thousandSeparator={true}
        decimalScale={2}
        displayType={"text"}
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
