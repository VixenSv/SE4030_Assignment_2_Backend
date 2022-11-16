const express = require("express");
const router = express.Router();
const messageHandler = require("../services/message-handler.service");

module.exports =   function () {
  router.post("/create", messageHandler.saveMsg );
  router.get("/getall", messageHandler.getAllMsg);
  router.get("/view/:id",messageHandler.viewMsgBySenderId);
  return router;
};

