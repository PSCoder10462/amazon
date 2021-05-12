import React, { forwardRef } from "react";
import "../assets/css/CheckoutProduct.css";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { useStateValue } from "../ReactContextApi/StateProvider";
import { REMOVE_FROM_BASKET } from "../ReactContextApi/ActionTypes";

const CheckoutProduct = forwardRef(
  ({ id, title, img_url, price, rating }, ref) => {
    // eslint-disable-next-line
    const [state, dispatch] = useStateValue();

    const removeFromBasket = () => {
      dispatch({
        type: REMOVE_FROM_BASKET,
        id,
      });
    };

    return (
      <div className="checkoutProduct" ref={ref}>
        <img src={img_url} alt="product" className="checkoutProduct__img" />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} />
              ))}
            {Array(5 - rating)
              .fill()
              .map((_, i) => (
                <StarOutlineIcon key={i} />
              ))}
          </div>
          <button onClick={removeFromBasket} className="ptr">
            Remove from Cart
          </button>
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
