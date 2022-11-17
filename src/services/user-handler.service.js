const express = require("express");
const jwt = require('jsonwebtoken')
const responseHandler = require('../response/response.handler');
const Staff = require('../entities/staff.entity');

const saveUser = async (req, res) => {
     if (req.body && req.body.email && req.body.role == "ADMIN") {
            new Promise(async (resolve, reject) => {

              let userEmail = req.body.email;

              let staff = await Staff.findOne({ emailAddress: userEmail });
              if (staff) {
                return resolve("Duplicated user record");
              }
 let body = {
                emailAddress: req.body.email,
                userType: req.body.userType,
                password: req.body.password
              };
              staff = new Staff(body);
              await staff.save();


              const Access_TOKEN = jwt.sign({ _id: staff._id }, 'ABC_COMPANY_KEY');
              staff.accessToken = Access_TOKEN;

              await staff.save();

              let response = {
                staff_id: staff._id,
                emailAddress: staff.emailAddress,
                accessToken: Access_TOKEN,
                userType: staff.role,
              };
              return resolve({ response, Access_TOKEN });
            })
              .then((data) => {
                if (data === "This User Already Exists") {
                console.log("This User Already Exists")

                } else {
                console.log("Staff Successfully Created")

                }

                responseHandler.respond(res, data);
              })
              .catch((error) => {
              console.log("Cannot Add Staff Member")

                responseHandler.handleError(res, error.message);
              });
          }
  };


 const loginUser = async (req, res) => {
     if (req.body && req.body.email && req.body.password) {
       let { email, password } = req.body;

       new Promise(async (resolve, reject) => {
         try {


               const user = await Staff.findOne({ emailAddress: email });
               console.log(email)
               if (!user) {
                 throw new Error('User Not Found');
               }

               let isMatch = false;
               if(password == user.password){isMatch = true}

               if (!isMatch) {
                 throw new Error('incorrect password');
               }


               const TOKEN = jwt.sign({ _id: user._id }, 'ABC_COMPANY_KEY', {expiresIn: "18000s"});
               user.token = TOKEN;

               await user.save();

               let responseData = {
                 user_id: user._id,
                 emailAddress: user.email,
                 accessToken: TOKEN,
                 userType: user.userType,
               };
               return resolve({ responseData });
         } catch (error) {
         console.log(error)
           return resolve(error.message);
         }
       })
         .then((data) => {
           if (data === 'USer not found') {

           } else if (data === 'Incorrect password') {

           } else {

           }
           responseHandler.respond(res, data);
         })
         .catch((error) => {

           responseHandler.handleError(res, error.message);
         });
     } else {
       return responseHandler.handleError(res, 'Missing Credentials');
     }
   };

  module.exports = {
    saveUser,
    loginUser
  }