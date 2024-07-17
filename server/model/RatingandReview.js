
const mongoose = require("mongoose");

const RatingandReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    Rating:{
        type:Number,
        required:true
    },
    Review:{
        type:String,
        required:true
    },
    hotels:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"hotels",
        index:true
    }
})

module.exports = mongoose.model("RatingandReview",RatingandReviewSchema);