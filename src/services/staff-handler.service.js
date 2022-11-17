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

  const loginUser = async (req, res) => {
    if (req.body && req.body.email && req.body.password) {
      let { email, password } = req.body;

      new Promise(async (resolve, reject) => {
        try {

              // check if user email exists
              const user = await User.findOne({ email });
              if (!user) {
                throw new Error(enums.user.NOT_FOUND);
              }
              //compare if the entered and existing password matches
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                throw new Error(enums.user.PASSWORD_NOT_MATCH);
              }

              //generating the user token
              const TOKEN = jwt.sign({ _id: user._id }, 'ABC_CompanySecret', {expiresIn: "18000s"});
              user.token = TOKEN;
              //saving the user token
              await user.save();

              let responseData = {
                user_id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: TOKEN,
                userType: user.userType,
              };
              return resolve({ responseData });
        } catch (error) {
          return resolve(error.message);
        }
      })
        .then((data) => {
          if (data === enums.user.NOT_FOUND) {
            LOG.warn(enums.user.NOT_FOUND);
          } else if (data === enums.user.PASSWORD_NOT_MATCH) {
            LOG.warn(enums.user.PASSWORD_NOT_MATCH);
          } else {
            LOG.info(enums.user.LOGIN_SUCCESS);
          }
          responseHandler.respond(res, data);
        })
        .catch((error) => {
          LOG.info(enums.user.LOGIN_ERROR);
          responseHandler.handleError(res, error.message);
        });
    } else {
      return responseHandler.handleError(res, enums.user.CREDENTIAL_REQUIRED);
    }
  }

module.export = {
    loginUser,
}