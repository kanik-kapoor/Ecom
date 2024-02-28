const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrorHandler = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const User = require("../models/userModel.js");
const axios = require('axios');

//create product --Admin
const createProduct = catchAsyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  // res.status(200).json({
  //   message: "Product created successfully.",
  //   product: product,
  // });
  res.render('new-product')
});

const newProduct = async (req,res) =>{
  res.render('new-product')
}

const searchProduct = async (req,res) =>{
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find().lean(), req.query)
    .search()
    .filter()
  const product = await apiFeatures.query;
  res.render('filter',{product})
}

const search = async (req,res) =>{
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find().lean(), req.query)
    .search()
    .filter()
  const product = await apiFeatures.query;
  res.status(200).json({
    success: true,
    message: "Review added successfully",
    product: product,
  });
}

const deleteProduct = async (req,res) =>{
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find().lean(), req.query)
    .search()
    .filter()
  const product = await apiFeatures.query;
  res.render('delete-product', {product, productCount})
}

//get all products
const getAllProducts = catchAsyncErrorHandler(async (req, res, next) => {
  // const resultPerpage = 5;
  // var token = JSON.parse(JSON.stringify(req.cookies));
  const user = req.session.user || []; 
  const cart = req.session.cart || []; 
  const totalCartPrice = req.session.totalCartPrice || []
  
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find().lean(), req.query)
    .search()
    .filter()
    // .pagination(resultPerpage);
  const product = await apiFeatures.query;
  // console.log(cart);
  res.render('home',{product, productCount, user, cart, totalCartPrice})
});

//update product --Admin

const updateProducts = catchAsyncErrorHandler(async (req, res, next) => {
  // console.log("body");
  // console.log(req.params.id);
  // console.log("body");
  // console.log(req.body);
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product: product,
  });
  // console.log(req.body);
});
//delete product -- Admin

const deleteProducts = catchAsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found.",
    });
  }
  product = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    meessage: "Product deleted successfully ",
  });
});

// get individual product detail using product id

const productDetail = catchAsyncErrorHandler(async (req, res, next) => {
  const user = req.session.user || []; 
  const cart = req.session.cart || []; 
  const totalCartPrice = req.session.totalCartPrice || []

  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  // console.log(product);

  // res.status(200).json({
  //   success: true,
  //   product: product,
  // });
  res.render('product',{product, cart, user, totalCartPrice})
});

//create new review or update the review

const createProuctReview = catchAsyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id
  );
  if (isReviewed) {
    if ((rev) => rev.user.toString() === req.user._id) {
      product.reviews.forEach((rev) => {
        rev.rating = rating;
        rev.comment = comment;
      });
    }
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  }) / product.reviews.length;
  product.ratings = avg;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
    review: review,
    avg: avg,
    product: product,
  });
});

//get all reviews of single product
const getAllreviewsSingleProduct = catchAsyncErrorHandler(
  async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      next(new ErrorHandler("Product Not found", 401));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

const deleteReviews = catchAsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    next(new ErrorHandler("Product not found", 401));
  }

  const reviews = product.reviews.filter(
    rev => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;  

 reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings =  avg/ reviews.length;
  const numOfReviews = reviews.length 

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews,
  },{
    new:true, 
    runValidators:true, 
    useFindAndModify:false
})

  res.status(200).json({
    success: true,
    message: "Product Review  deleted successfully",
    product,
  });
});

const addToCart = catchAsyncErrorHandler(async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that provides user information
  const productId = req.params.id;
  const quantity = req.body.quantity; // Assuming the quantity is sent in the request body

  try {
    // Use Promise.all to fetch user and product simultaneously
    const [user, product] = await Promise.all([
      User.findById(userId),
      Product.findById(productId),
    ]);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or product not found.' });
    }

    // Check if the product is already in the cart
    const existingCartItemIndex = user.cart.findIndex(item => item.product.equals(productId));

    if (existingCartItemIndex !== -1) {
      // If the product is already in the cart, update its quantity
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // If not, add a new item to the cart
      user.cart.push({ product: productId, quantity: quantity });
    }

    await user.save();

    // Fetch product details for all items in the cart in parallel
    const cartProductIds = user.cart.map(item => item.product);
    const cartProductQty = user.cart.map(item => item.quantity);
    const cartDetail = await Promise.all(user.cart.map(async (data) => {
      const details = await Product.findById(data.product);
      return { ...details.toObject(), quantity: data.quantity };
    }));

    req.session.cart = cartDetail;

    // Calculate the total cart price
    const totalCartPrice = cartDetail.reduce((total, product) => total + product.price * product.quantity, 0);
    req.session.totalCartPrice = totalCartPrice; // Save the total cart price in the session

    return res.status(200).json({ message: 'Product added to cart successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});




const removeFromCart = catchAsyncErrorHandler(async (req, res) => {
  const userId = req.user._id; // Assuming you have authentication middleware that provides user information
  const productId = req.params.id;
  const quantity = req.body.quantity; // Assuming the quantity is sent in the request body

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or product not found.' });
    }

    // Find the cart item with the matching product ID
    const cartItem = user.cart.find(item => item.product.equals(productId));

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in the cart.' });
    }

    // Calculate the total price of the removed product
    const totalPriceOfRemovedProduct = product.price * quantity;

    // Update the user's totalCartPrice by subtracting the removed product's total price
    user.totalCartPrice -= totalPriceOfRemovedProduct;

    // Ensure that the totalCartPrice is never negative
    if (user.totalCartPrice < 0) {
      user.totalCartPrice = 0;
    }

    // Update the cart item's quantity
    cartItem.quantity -= quantity;

    // If the updated quantity is zero or less, remove the item from the cart
    if (cartItem.quantity <= 0) {
      user.cart = user.cart.filter(item => !item.product.equals(productId));
    }

    await user.save();

    // Fetch product details for all items in the updated cart
    const cartDetail = await Promise.all(user.cart.map(async (data) => {
      const details = await Product.findById(data.product);
      return { ...details.toObject(), quantity: data.quantity };
    }))

    req.session.cart = cartDetail; // Update the cart details in the session

    // Calculate the total cart price based on the updated cart details
    const updatedTotalCartPrice = cartDetail.reduce((total, product) => total + product.price * product.quantity, 0);

    req.session.totalCartPrice = updatedTotalCartPrice; // Update the total cart price in the session

    return res.status(200).json({ message: 'Product removed from cart successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});


const cartDetails = catchAsyncErrorHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    const cartDetail = await Promise.all(user.cart.map(async (data) => {
      const product = await Product.findById(data.product);
      const totalProductPrice = product.price * data.quantity;
      return { ...product.toObject(), quantity: data.quantity, totalPrice: totalProductPrice };
    }));

    // Calculate the total cart price
    const totalCartPrice = cartDetail.reduce((total, product) => total + product.totalPrice, 0);

    // Update the user's totalCartPrice in the database
    user.totalCartPrice = totalCartPrice;
    await user.save();

    return res.status(200).json({ 
      success: true,
      cartDetail: cartDetail,
      totalCartPrice: totalCartPrice,
      message: 'Product added to cart successfully.' 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});



module.exports = {
  getAllProducts,
  createProduct,
  newProduct,
  deleteProduct,
  updateProducts,
  deleteProducts,
  productDetail,
  createProuctReview,
  getAllreviewsSingleProduct,
  deleteReviews,
  searchProduct,
  search,
  addToCart,
  cartDetails,
  removeFromCart
};
