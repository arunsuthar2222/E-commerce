const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { findByIdAndDelete } = require("../models/Order");

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

const addProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

/// Update Product -- Admin
const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

const getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product: product });
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ user: req.user.id });

  res.status(200).json({ success: true, products });
});

/// Create Review and update review
const createProductReview = catchAsyncError(async (req, res, next) => {
  const productId = req.body.productId;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  let isReviewed = false;

  product.reviews.forEach((rev) => {
    if (req.user._id.toString() === rev.user.toString()) {
      isReviewed = true;
    }
  });

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(req.body.rating);
        rev.comment = req.body.comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  let avgRating = (totalRating / product.reviews.length).toFixed(1);
  product.ratings = avgRating;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

/// Get All Reviews Of All Products
const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, reviews: product.reviews });
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews;
  var index;
  reviews.forEach((rev, index) => {
    if (
      rev._id.toString() === req.query.id.toString() &&
      req.user.id.toString() === rev.user.toString()
    ) {
      reviews.splice(index, 1);
    }
  });

  product.reviews = reviews;
  let totalRating = 0;
  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });
  let avgRating = (totalRating / reviews.length).toFixed(1);
  product.ratings = avgRating;
  product.numOfReviews = reviews.length;
  await product.save({
    new: true,
    validateBeforeSave: false,
  });
  res.status(200).json({ success: true });
});

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductDetail,
  deleteProduct,
  getProductReviews,
  createProductReview,
  deleteReview,
  getAdminProducts,
};
