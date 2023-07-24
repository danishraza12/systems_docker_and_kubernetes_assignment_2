// imports
const express = require("express");
const morgan = require("morgan");
const amqp = require('amqplib');

const { receiveMsg } = require("../lib/rmq");

const BLIING_QUEUE_NAME = "billing";
const SHIPPING_QUEUE_NAME = "shipping";
const USERS_QUEUE_NAME = "users";

receiveMsg(BLIING_QUEUE_NAME);
receiveMsg(SHIPPING_QUEUE_NAME);
receiveMsg(USERS_QUEUE_NAME);