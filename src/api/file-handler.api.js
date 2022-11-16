const express = require("express");
const router = express.Router();

const fileHandler = require("../services/file-handler.service");
const authentication = require("../authenticator/authenticator");

module.exports =   function () {
  router.post("/upload", authentication, fileHandler.saveFile );
  router.get("/:id", authentication , fileHandler.getFileByID );
  return router;
};