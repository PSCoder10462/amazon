import React from "react";
import "../assets/css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../ReactContextApi/StateProvider";
import { useHistory } from "react-router-dom";
import { getTotalPrice } from "../ReactContextApi/Reducer";

function Subtotal() {
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  const handleSubmit = () => {
    if (!user) history.push("/login");
    else history.push("/payment");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        value={getTotalPrice(basket)}
        thousandSeparator={true}
        decimalScale={2}
        displayType={"text"}
        prefix={"₹"}
      />
      <button className="ptr" onClick={handleSubmit}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
