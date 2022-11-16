const express = require("express");
const router = express.Router();
const staffService = require("../services/staff-handler.service");
 

module.exports =   function () {
  router.post("/create", function(req,res){
  staffService.addStaff});
  
  return router;
};