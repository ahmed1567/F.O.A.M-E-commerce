const { Product } = require("../models/product.model");
const { Review } = require("../models/review.model");
const { errorHandler } = require("../Helpers/errorHandler");

const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(errorHandler(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    productId: req.body.productId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      productId: req.body.productId,
      userId: req.userId,
    });

    if (review)
      return next(
        errorHandler(403, "You have already created a review for this product!")
      );

    //TODO: check if the user purchased the product.

    const savedReview = await newReview.save();

    await Product.findByIdAndUpdate(req.body.productId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};


const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review.userId !== req.userId)
      return next(errorHandler(403, "You can delete only your reviews!"));

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).send("review has been deleted!");
  } catch (err) {
    next(err);
  }
};

  module.exports = {
    createReview,
    getReviews,
    deleteReview

  };