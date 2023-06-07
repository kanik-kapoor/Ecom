const { response } = require('express');
const express = require('express');
const app = express();
const connectDB =  require("../db");
const Cart = require("../models/shoppingCart.js")

const addItem = async (req, res) =>{
    var isItemAlreadyInCart = 0;
   const cart = await Cart.findOne({ username: req.body.username})
   if (!cart){
    const newcart  = { 
        "totalitems" : req.body.Qty,
        "totalAmount" : req.body.ItemPrice,
        "Items" :[{
            "Itemid" : req.body.Itemid,
            "ImageUrl" : req.body.ImageUrl,
            "ItemName" : req.body.ItemName,
            "ItemPrice" : req.body.ItemPrice,
            "Qty" : req.body.Qty
        }]
    }
    await Cart.create(newcart);
    return res.status(200).send(newcart)
   }
   else{
    console.log(cart);
    var items= (cart.Items)
    items.forEach(item => {
        if (item.Itemid == req.body.Itemid){
            item.Qty = parseInt(item.Qty) + parseInt(req.body.Qty);
            isItemAlreadyInCart = 1
         }
    })
    if(isItemAlreadyInCart = 0){
    const newcart  = { 
        "userName":cart.userName,
        "totalitems" : cart.totalitems + req.body.Qty,
        "totalAmount" : cart.totalitems + req.body.ItemPrice,
        "Items" : jsonparse(cart)['Items'].push({
            "itemid" : req.body.itemid,
            "ImageUrl" : req.body.ImageUrl,
            "ItemName" : req.body.ItemName,
            "ItemPrice" : 1,
            "Qty" : req.body.Qty
        })}
        await Cart.findOneAndUpdate({ username: req.body.username},newcart)
        return res.status(200).send(newcart)
    }
    else{
        const newcart  = { 
            "userName":cart.userName,
            "totalitems" : parseInt(cart.totalitems) + parseInt(req.body.Qty),
            "totalAmount" : cart.totalAmount + req.body.ItemPrice,
            "Items" : items
    }
    await Cart.findOneAndUpdate({ username: req.body.username},newcart)
    return res.status(200).send(newcart)
    }
  
    
}
}

const getProduct = async (req, res) =>{
    res.render('product')
}



module.exports = {
    addItem,
    getProduct
}