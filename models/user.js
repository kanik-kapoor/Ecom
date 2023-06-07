const mongoose = require('mongoose');

const userSchema = mongoose.Schema
const User = new userSchema({
    name: String,
    email: String,
    username:String,
    user_id: Number,
    password: String
})

const myModel = mongoose.model("User", User);

module.exports = myModel;