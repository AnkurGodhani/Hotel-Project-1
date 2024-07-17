const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    hostelName:{
        type:String,
        required:true
    },
    ownderName:{
        type:String,
        required:true
    },
    place_location:{
        type:String,
        required:true
    },
    totalRoom:[{
        type:Number,
        required:true
    }],
    reservation_Room:[{
        type:Number,
        default:0
    }],
    hostel_image:[{
        type:String,
        required:true,
        index:true
    }],
    contact_no:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Facilities:[{
        type:String,
        required:true
    }],
    Text_and_charges:[{
        type:String,
        required:true
    }],
    Offer_and_discount:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"discount"
    }],
    Booking_of:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking",
        index:true
    }],
    createAt:{
        type:Date,
        default: Date.now()
    },
    RatingandReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingandReview"
        }
    ]

})

module.exports = mongoose.model("hotels",hotelSchema);