const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrorHandler = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

//create product --Admin
const createProduct = catchAsyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    message: "Product created successfully.",
    product: product,
  });
});

const newProduct = async (req,res) =>{
  res.render('admin')
}

//get all products
const getAllProducts = catchAsyncErrorHandler(async (req, res, next) => {
  const resultPerpage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find().lean(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  const product = await apiFeatures.query;
  // res.status(200).json({
  //   success: true,
  //   products: product,
  //   productCount: productCount,
  // });

  //  console.log(product);
  res.render('home',{product,productCount})
});

//update product --Admin

const updateProducts = catchAsyncErrorHandler(async (req, res, next) => {
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
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  // console.log(product);

  // res.status(200).json({
  //   success: true,
  //   product: product,
  // });
  res.render('product',{product:product})
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

module.exports = {
  getAllProducts,
  createProduct,
  newProduct,
  updateProducts,
  deleteProducts,
  productDetail,
  createProuctReview,
  getAllreviewsSingleProduct,
  deleteReviews,
};
