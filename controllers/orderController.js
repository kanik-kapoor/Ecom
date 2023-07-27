const Order = require('../models/orderModel.js')
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrorHandler = require("../middleware/catchAsyncError.js");

//create new order 
const newOrder = catchAsyncErrorHandler(async (req, res, next) =>{
   const {
    shippingInfo, 
    orderItems, 
    paymentInfo, 
    itemPrice, 
    taxPrice,
    shippingPrice, 
    totalPrice
} = req.body;

const order = await Order.create({
    shippingInfo, 
    orderItems, 
    paymentInfo, 
    itemPrice, 
    taxPrice,
    shippingPrice, 
    totalPrice,
    paidAt:Date.now(),
    user:req.user._id
})

res.status(201).json({
    success:true,
    message:"Order created successfully",
    order
})

})

//get logged in  single order details
const getSingleOrderDetail = catchAsyncErrorHandler (async (req, res, next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

  res.status(200).json({
             success:true,
             message:"Order fetched successfully",
             order
         })
})

//get my orders details 
const myOrders = catchAsyncErrorHandler(async (req, res, next)=>{
    const orders = await Order.find({user:req.user._id});
    res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            orders
        })
})

//get all orders detail --Admin

const getAllOrders = catchAsyncErrorHandler(async (req, res, next)=>{
 const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach(order=>{
    totalAmount+=order.paymentInfo.totalPrice
  })
    res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            totalAmount,
            orders
        })
})

//update order status --Admin

const updateOrder = catchAsyncErrorHandler(async (req, res, next)=>{
    const order = await Order.findById(req.params.id)
     console.log(order.orderStatus)
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order already delivered",400))
    }
  order.orderItems.forEach(async (orders)=>{
    await updatestock(orders.product, orders.quantity);
  })

  order.orderStatus = req.body.status;
  
  if(req.body.status==="Delivered"){
    order.deliveredAt = Date.now();
  }

  await order.save({validateBeforeSave:false});
    res.status(200).json({
            success:true,
      
        })

})

//delete order 
const deleteOrder = catchAsyncErrorHandler(async (req, res, next)=>{
    const orders = await Order.findByIdAndDelete(req.params.id);
  
  if(!orders){
    return next(new ErrorHandler("Order not found",404))
  }

       res.status(200).json({
               success:true,
               message:"Orders deleted successfully",
            
           })
   })
   

async function updatestock (id,quantity){
   
    const product = await Product.findById(id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    product.stock -= quantity;
    await product.save();
}

module.exports = {
    newOrder,
    getSingleOrderDetail,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
}

