const express = require("express");

//handler apis
const userHandlerApi = require('./api/staff-handler.api')
const messageHandlerApi = require('./api/message-handler.api')
const fileHandlerApi = require('./api/file-handler.api')


//extra modules
const authenticator = require('./authenticator/authenticator');


module.exports =   function (app) {
    //API endpoints of user
    app.use('/staff',userHandlerApi());

    //API endpoints of message
    app.use('/message',authenticator,messageHandlerApi());

    //API endpoints of file
    app.use('/file', fileHandlerApi());
};