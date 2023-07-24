// imports
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const amqp = require('amqplib');

const { sendMsg } = require("../lib/rmq");

const SHIPPING_QUEUE_NAME = "shipping";

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
  sendMsg(SHIPPING_QUEUE_NAME, req.body.billId);

  res.send(req.body.billId);
});

app.put("/shipping", (req, res) => {
  res.send("PUT SHIPPING");
});

app.delete("/shipping", (req, res) => {
  res.send("DELETE SHIPPING");
});

receiveMsg(ORDERS_QUEUE_NAME);

app.listen(5009);
