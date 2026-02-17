const express = require("express");

const {
  addProductReview,
  getProductProductReviews,
} = require("../../controllers/shop/products-review-controller");

const router = express.Router();

router.post("/add", addProductReview);
router.get("/get/:productId", getProductProductReviews);

module.exports = router;
