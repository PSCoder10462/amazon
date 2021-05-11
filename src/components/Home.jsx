import React from "react";
import Banner from "../assets/images/banner.jpg";
import "../assets/css/Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img src={Banner} alt="home banner" className="home__image" />

        <div className="home__row">
          <Product
            id="hpatps103"
            title="Harry Potter and the Philosopher's Stone"
            img_url="https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UY327_FMwebp_QL65_.jpg"
            price={"291"}
            rating={5}
          />
          <Product
            id="hpatcof104"
            title="Harry Potter and the Chamber of Secrets (Harry Potter 2)"
            img_url="https://m.media-amazon.com/images/I/91HHqVTAJQL._AC_UY327_FMwebp_QL65_.jpg"
            price={"326"}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="nai11128b"
            title="New Apple iPhone 11 (128GB) - Black"
            img_url="https://m.media-amazon.com/images/I/71i2XhHU3pL._AC_UY327_FMwebp_QL65_.jpg"
            price={"59,900"}
            rating={4}
          />
          <Product
            id="nai1264b"
            title="New Apple iPhone 12 Mini (64GB) - Black"
            img_url="https://m.media-amazon.com/images/I/71uuDYxn3XL._AC_UY327_FMwebp_QL65_.jpg"
            price={"58,999"}
            rating={5}
          />
          <Product
            id="op95wm12r256g"
            title="OnePlus 9 5G (Winter Mist, 12GB RAM, 256GB Storage) | Extra INR 3,000 OFF on Exchange"
            img_url="https://m.media-amazon.com/images/I/61MJilnI5pL._AC_UY327_FMwebp_QL65_.jpg"
            price={"54,999"}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="pfgnbrhbs26i"
            title="Punam Flutes G Natural Base Right Hand Bansuri Size 26 Inches"
            img_url="https://images-na.ssl-images-amazon.com/images/I/71YlTHBvCqL._SL1500_.jpg"
            price={"4,526"}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
