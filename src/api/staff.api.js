const express = require("express");
const router = express.Router();
const staffService = require("../services/staff.service");
 

module.exports =   function () {
  router.post("/create", staffService.addStaff);
  
  return router;
};