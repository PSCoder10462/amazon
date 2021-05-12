const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IqCSGSCsARf75NHinT6PwqDZcLJ33h5gJL6i4X3K9MCcwGSBbmKLaSNHbKwEhycNKcbXQBU25lV0MSyBSqFByTl00MTlaK9Af"
);

// api

// app config
const app = express();

// middleware
app.use(cors({ origin: true }));

// api routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received with a total of: ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listener
// functions => cloud functions
exports.api = functions.https.onRequest(app);
