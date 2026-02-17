const mongoose = require('mongoose');



const ProductReviewSchema = new mongoose.Schema({
    productId : String,
    userId : String,
    userName : String,
    reviewMessage : String,
    reviewValue : Number,
    createdAt : { type: Date, default: Date.now }
}, {
    timestamps: true
})


module.exports = mongoose.model('ProductReview', ProductReviewSchema);