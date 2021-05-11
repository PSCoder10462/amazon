import React from "react";
import "../assets/css/Product.css";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { useStateValue } from "../ReactContextApi/StateProvider";
import { ADD_TO_BASKET } from "../ReactContextApi/ActionTypes";

function Product({ id, title, img_url, price, rating }) {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const addToBasket = () => {
    // dispatch item to basket
    dispatch({
      type: ADD_TO_BASKET,
      item: {
        id,
        title,
        img_url,
        price,
        rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
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
      </div>
      <img src={img_url} alt="product" />
      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
