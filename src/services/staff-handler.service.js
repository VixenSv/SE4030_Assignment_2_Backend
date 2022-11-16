const Staff = require('../entities/staff.entity');
const express = require("express");

 
const addStaff = async (req, res) => {
    if (req.body && req.body.emailAddress && req.staff.role == "ADMIN") {
        new Promise(async (resolve, reject) => {
  
          let staffEmail = req.body.emailAddress;
          //find if user already exists
          let staff = await Staff.findOne({ emailAddress: staffEmail });
          if (staff) {
            return resolve("This User Already Exists");
          }
    
          staff = new Staff(req.body);
          //hashing passowrd
          staff.password = await bcrypt.hash(staff.password, 8);
          await staff.save();  
          
 
          
          //generating the user token
          const Access_TOKEN = jwt.sign({ _id: staff._id }, 'ABC_CompanySecret');
          staff.accessToken = Access_TOKEN;
          //saving the user token
          await staff.save();
  
          let response = {
            staff_id: staff._id,
            name: staff.firstName,            
            emailAddress: staff.emailAddress,
            contactNo: staff.contactNo,
            accessToken: Access_TOKEN,
            role: staff.role,
            isLogin: staff.isLogin
          };
          return resolve({ response, Access_TOKEN });
        })
          .then((data) => {
            if (data === "This User Already Exists") {
           //   LOG.warn("This User Already Exists");
            } else {
          //    LOG.info("Staff Successfully Created");
            }
    
            responseHandler.respond(res, data);
          })
          .catch((error) => {
        //    LOG.info("Cannot Add Staff Member");
            responseHandler.handleError(res, error.message);
          });
      }
}

module.export = {
    addStaff
}