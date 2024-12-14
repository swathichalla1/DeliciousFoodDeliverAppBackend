const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    number:{type:String},
    address:{type:String},
    cartlist:{type:Array,default:[]}
})

const User = mongoose.model("User",userSchema)

module.exports = User
