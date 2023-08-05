const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  compare_price: {
    type: Number,
    required: [false, "Please enter product price"],
  },
  image: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  total_ratings: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  type: {
    type: String,
    required: [true, "Please enter product type"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock"],
    maxLength: [4, "Stock can't exceed 4 characters"],
    default: 1,
  },
  total_reviews: {
    type: Number,
    defaul: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);