const mongoose = require('mongoose');

const cartSchema = mongoose.Schema
const Cart = new cartSchema({
    totalitems : Number,
    userName : String,
    totalAmount : mongoose.Decimal128,
    Items :[{
        Itemid : String,
        ImageUrl : String,
        ItemName : String,
        ItemPrice : mongoose.Decimal128,
        Qty : Number
    }]
})

const myModel = mongoose.model("Cart", Cart);

module.exports = myModel;