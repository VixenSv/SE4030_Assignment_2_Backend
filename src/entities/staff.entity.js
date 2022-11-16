const mongoose = require("mongoose");

const StaffEntity = new mongoose.Schema({
    name:{type:String, required:true, trim: true},     
    role:{type:String, required:true, trim: true},
    isLoggedIn:{type: Boolean , trim: true, default: false},
    contactNo: { type: String, required: true, trim: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },    
    emailAddress: {type: String, required: true, trim: true, max: 10},
    password: { type: String, required: true, trim: true },    
    accessToken:{type:String }
    
});

const staff = mongoose.model("staff", StaffEntity);
module.exports = staff;