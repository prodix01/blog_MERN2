const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    handle : {
        type : String,
        required : true,
        max : 30
    },
    company : {
        type : String
    },
    website : {
        type : String
    },
    location : {
        type : String
    },
    status : {
        type : String,
        required : true
    },
    skills : {
        type : [String],
        required : true
    },
    bio : {
        type : String
    },
    githubusername : {
        type : String
    },
    exprience : {},
    education : {},
    social : {},
    date : {
        type : Date,
        default : Date.now
    }
});