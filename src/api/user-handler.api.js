const express = require("express");
const router = express.Router();

const userHandler = require("../services/user-handler.service");
const authentication = require("../authenticator/authenticator");

module.exports =   function () {
  router.post("/save", userHandler.saveUser );
  router.post("/login" , userHandler.loginUser );
  return router;
};