const express = require("express");
const File = require('../entities/file.entity');
const responseHandler = require('../response/response.handler');
var fs = require('fs');
const crypto = require ("crypto");
const algorithm = "aes-256-cbc";

//upload file
const saveFile = async (req, res) => {
    if (req.body && req.body.userType == "MANAGER") {
      new Promise(async (resolve, reject) => {

       let data = {
       fileCode: req.body.file,
       fileOwner: req.body.createdBy
       }
       let file = new File(data)
        await file.save();

        let responseData = {
          file_id: file._id,
          fileCode: file.file,
          fileOwner: file.createdBy ,
        };

        return resolve({ responseData});
      })
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
          responseHandler.handleError(res, error.message);
        });
    }else {
        return responseHandler.handleError(res, 'Unauthorized function. Manager Only !');
      }

  }

  module.exports = {
    saveFile
  }