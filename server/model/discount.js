const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    sorttimeDiscount:{
        type:Date,
    },
    logerTimeDiscount:{
        type:Date,
    },
    typeofDiscount:{
        type:String,
        enum:["childer","yuva"]
    }
})

module.exports = mongoose.model("discount",discountSchema);