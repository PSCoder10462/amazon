import "./assets/css/App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import firebase from "./firebase";
import { useStateValue } from "./ReactContextApi/StateProvider";
import { SET_USER } from "./ReactContextApi/ActionTypes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51IqCSGSCsARf75NHM0Lm2KGmB62miDXAsZlQdL6WiDAdkG0uO9PM3h9AGwHKCGT3yQvXDPVQGich5oRL0OGxNB1s0026T4RSoM"
);

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: SET_USER,
          user: user,
        });
      } else
        dispatch({
          type: SET_USER,
          user: null,
        });
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
