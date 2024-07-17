// const { type } = require("@testing-library/user-event/dist/type")

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    sex:{
        type:String,
    },
    contact_no:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    locations:[{
        type:Number,
        required:true
    }],
    accountType:{
        type:String,
        enum:["Admin","customer"],
        default:"customer",
        required:true
    },
    otp:{
        type:String,
       
    },
    hotelInfo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotels"
    }],
    token:{
        type:String
    },
    BookingRoom:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking"
    }],
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("user",userSchema)