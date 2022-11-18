const express = require("express");
const Message = require("../entities/message.entity");
const responseHandler = require("../response/response.handler");
const Validator = require('../validator/validator')

const saveMsg = async (req, res) => {

  if (req.body) {
    if(Validator.validate(req.body.msg, req.body.hash)) {
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
    }else {
        return responseHandler.handleError(res, 'Unauthorized file change has been detected');
    }

  }
};


module.exports = {
  saveMsg,
}

