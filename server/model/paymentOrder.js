const mongoose = require('mongoose')


const payments = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'hotels',
        required:true
    },
    BookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"booking",
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    order_Id:{
        type:String,
        required:true
    },
    statusof:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('payment',payments)