const express = require("express");
const Message = require("../entities/message.entity");
const responseHandler = require("../response/response.handler");


const saveMsg = async (req, res) => {
console.log(req.body)
  if (req.body) {
    const message = new Message();
    message.senderId = req.body.createdBy;
    message.messageBody = req.body.msg;
     //encrypt message

    await message
      .save()
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  }
};


module.exports = {
  saveMsg,
}

