import React from "react";
import "../assets/css/Product.css";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

function Product({ title, img_url, price, rating }) {
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
              <StarIcon />
            ))}
          {Array(5 - rating)
            .fill()
            .map((_, i) => (
              <StarOutlineIcon />
            ))}
        </div>
      </div>
      <img src={img_url} alt="product image" />
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
