const express = require("express");
const router = express.Router();
const messageHandler = require("../services/message-handler.service");
const authentication = require("../authenticator/authenticator");

module.exports =   function () {
  router.post("/save", authentication, messageHandler.saveMsg );
  return router;
};

