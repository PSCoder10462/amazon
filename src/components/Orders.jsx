import React, { useState, useEffect } from "react";
import "../assets/css/Orders.css";
import { useStateValue } from "../ReactContextApi/StateProvider";
import firebase from "../firebase";
import Order from "./Order";

const db = firebase.firestore();

function Orders() {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your orders</h1>
      <div className="orders__order">
        {orders === [] ? (
          <p>You don't have any orders yet!</p>
        ) : (
          orders?.map((order) => (
            <Order data={order.data} key={order.id} orderId={order.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
