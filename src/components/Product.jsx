import React from "react";
import "../assets/css/Product.css";
import product_image from "../assets/images/product_image.jpg";

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
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={img_url} alt="product image" />
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
