// imports
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ! SHIPPING OPERATIONS
app.get("/shipping", (req, res) => {
  res.send("GET SHIPPING");
});

app.post("/shipping", async (req, res) => {
  console.log(req.body);

  const billingResponse = await axios.post("http://localhost:5007/billing");
  console.log("billingResponse: ", billingResponse);

  res.send(billingResponse);
});

app.put("/shipping", (req, res) => {
  res.send("PUT SHIPPING");
});

app.delete("/shipping", (req, res) => {
  res.send("DELETE SHIPPING");
});

app.listen(5009);
