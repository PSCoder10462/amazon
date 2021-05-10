import React from "react";
import "../assets/css/Product.css";
import product_image from "../assets/images/product_image.jpg";

function Product() {
  return (
    <div className="product">
      <div className="product__info">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
          aspernatur unde
        </p>
        <p className="product__price">
          <small>₹</small>
          <strong>500</strong>
        </p>
        <div className="product__rating">
          {Array(5)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={product_image} alt="product image" />
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
