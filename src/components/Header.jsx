import React from "react";
import amazon from "../assets/images/amazon.png";
import "../assets/css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../ReactContextApi/StateProvider.js";
import firebase from "../firebase";

function Header() {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const handleUser = () => {
    if (user) {
      const e = window.confirm(
        "You will be signed out! \nStill want to continue?"
      );
      if (e) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("signed out");
          })
          .catch((err) => console.log(err.message));
      }
    } else history.push("/login");
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={amazon} alt="amazon_logo" className="header__logo" />
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option ptr" onClick={handleUser}>
          <span className="header__optionLineOne">
            Hello {user ? `${user.email}` : "Guest"}
          </span>
          <span className="header__optionLineTwo">
            {user ? "Sign Out" : "Sign In"}
          </span>
        </div>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
