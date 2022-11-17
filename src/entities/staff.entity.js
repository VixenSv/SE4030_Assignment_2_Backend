const mongoose = require("mongoose");

const StaffEntity = new mongoose.Schema({
    userType:{type:String, required:true, trim: true},
    emailAddress: {type: String, required: true, trim: true, max: 10},
    password: { type: String, required: true, trim: true },    
    accessToken:{type:String }
    
});

const staff = mongoose.model("staff", StaffEntity);
module.exports = staff;