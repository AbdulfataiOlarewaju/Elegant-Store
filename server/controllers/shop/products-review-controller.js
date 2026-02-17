const Order = require("../../models/Order");
const ProductReview = require("../../models/Review");
const Product = require("../../models/Product");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });
  
    
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You can only review products you have purchased.",
      });
    }
    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    // we need to update the product schrema to add review so that we will be able to render it in the product-deatils dialog
    const reviews = await ProductReview.find({ productId }); //find review for a particular product
    const totalReviewsLength = reviews.length;
    const averageRewview =
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, {
      averageRewview,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductProductReviews =async(req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId }); 
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addProductReview,
  getProductProductReviews,
};
