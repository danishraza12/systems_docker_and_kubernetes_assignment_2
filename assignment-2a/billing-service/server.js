// imports
const express = require("express");
const morgan = require("morgan");

const { sendMsg } = require("../lib/rmq");

const BILLING_QUEUE_NAME = "billing";

// init express app
const app = express();

// use morgan middleware
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// ! BILLING CRUD OPERATIONS
app.get("/billing", (req, res) => {
  res.send("GET BILLS");
});

app.post("/billing", (req, res) => {
  sendMsg(BILLING_QUEUE_NAME, req.body.billId);

  res.send(req.body);
});

app.put("/billing", (req, res) => {
  res.send("PUT BILL");
});

app.delete("/billing", (req, res) => {
  res.send("DELETE BILL");
});

const port = 5007;

app.listen(port, () => {
  console.log(`Billing service listening on ${port}`);
});
