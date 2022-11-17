const express = require("express");

//handler apis
const staffHandlerApi = require('./api/staff-handler.api')
const messageHandlerApi = require('./api/message-handler.api')
const fileHandlerApi = require('./api/file-handler.api')
const userHandlerApi = require('./api/user-handler.api')

//extra modules
const authenticator = require('./authenticator/authenticator');


module.exports =   function (app) {
    //API endpoints of user
    app.use('/staff',staffHandlerApi());


//API endpoints of user
    app.use('/user',userHandlerApi());

    //API endpoints of message
    app.use('/message',messageHandlerApi());

    //API endpoints of file
    app.use('/file', fileHandlerApi());
};