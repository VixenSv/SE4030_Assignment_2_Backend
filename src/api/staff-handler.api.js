const express = require("express");
const router = express.Router();
const staffHandler = require("../services/staff-handler.service");

module.exports =   function () {
  router.post("/login", function(req,res) {
    console.log(req);
    staffHandler.loginUser
    });
  return router;
};