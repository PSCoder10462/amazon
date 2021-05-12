import React, { useState, useEffect } from "react";
import "../assets/css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../ReactContextApi/StateProvider";
import { useHistory } from "react-router-dom";

function Subtotal() {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();
  const [price, setPrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let sum = 0;
    basket?.forEach((b) => {
      let num = "";
      for (let i = 0; i < b.price.length; ++i) {
        if (b.price[i] !== ",") num += b.price[i];
      }
      sum += Number(num);
    });
    setPrice(sum);
  }, [basket]);

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
        value={price} // fix this
        thousandSeparator={true}
        decimalScale={2}
        displayType={"text"}
        prefix={"₹"}
      />
      <button className="ptr" onClick={() => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
