import React from "react";
import "../assets/css/Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../ReactContextApi/StateProvider";

function Checkout() {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="checkout ad banner"
        />

        <div>
          <h2 className="checkout__title">Your Shopping Cart</h2>
        </div>

        {basket?.map((b) => (
          <CheckoutProduct
            key={b.id}
            title={b.title}
            price={b.price}
            rating={b.rating}
            img_url={b.img_url}
            id={b.id}
          />
        ))}
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
