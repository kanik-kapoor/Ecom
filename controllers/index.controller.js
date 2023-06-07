const express = require('express');
const app = express();
const connectDB =  require("../db")
const User = require("../models/user.js")


const home = async (req, res) =>{
    res.render('home')
}
const login = async (req, res) =>{
    res.render('login')
}
const register = async (req, res) =>{
    res.render('register')
}
const CreateUser = async (req, res) =>{
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username});
    if (user) return res.status(400).send("user Alredy Exsists");
    const newUser = await User.create(req.body) ;
    res.status(201).send(req.body);
}

module.exports = {
    home,
    login,
    register,
    CreateUser
}