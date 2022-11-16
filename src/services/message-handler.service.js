const express = require("express");
const Message = require("../entities/message.entity");
const responseHandler = require("../response/response.handler");
//Message encryption imports
const crypto = require ("crypto");

const algorithm = "aes-256-cbc";
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);
// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
// the decipher function
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);


function decrypt(){
  const encrypted= new Message();
  let decryptedData = decipher.update(encrypted.message, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  console.log(decryptedData);
  return decryptedData;
}

const saveMsg = async (req, res) => {
  if (req.body) {
    const message = new Message();
    message.createdBy = req.body.createdBy;
    message.title = req.body.title;
     //encrypt message
    let encryptedData = cipher.update(req.body.message, "utf-8", "hex");
    encryptedData += cipher.final("hex")
    message.message =encryptedData;
    message.messageDate = new Date().toLocaleDateString();
    message.messageTime = new Date().toTimeString();
    await message
      .save()
      .then((data) => {
        responseHandler.respond(res, data);
     //   LOG.info('Message successfully saved');
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
     //   LOG.info('Message saving error');
      });
  }
};

const getAllMsg = async (req, res) =>{
  await Message.find({decrypt})
    .sort({messageDate: -1})
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
};

const viewMsgBySenderId = async (req, res) => {
  await Message.find({ createdBy: req.params.id , decrypt})
    .sort({ messageDate: -1 })
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  saveMsg,
  getAllMsg,
  viewMsgBySenderId,
}

