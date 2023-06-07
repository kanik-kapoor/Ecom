const express = require("express")
const cartController = require("../controllers/shoppingCart.controller.js")
const passport = require("passport");
const { isAuthenticated } = require("../controllers/auth");
const cartRouter = express.Router()

cartRouter.post('/additem', isAuthenticated,(req,res) =>{
    cartController.addItem(req,res)
});

cartRouter.get('/getproduct',(req,res)=>{
    cartController.getProduct(req,res)
});

module.exports  = cartRouter