import React from "react";
import Banner from "../assets/images/banner.jpg";
import "../assets/css/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img src={Banner} alt="home banner" className="home__image" />
      </div>
    </div>
  );
}

export default Home;
