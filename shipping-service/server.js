// imports
const express = require("express");
const morgan = require("morgan");
const amqp = require('amqplib');


const { receiveMsg } = require("../data-service/message-queue");

const ORDERS_QUEUE_NAME = "orders";

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

app.post("/shipping", (req, res) => {
  console.log(req.body);
  res.send("POST SHIPPING");
});

app.put("/shipping", (req, res) => {
  res.send("PUT SHIPPING");
});

app.delete("/shipping", (req, res) => {
  res.send("DELETE SHIPPING");
});

receiveMsg(ORDERS_QUEUE_NAME);

app.listen(5002);
