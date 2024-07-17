const Razorpay = require("razorpay")
require('dotenv').config();

exports.instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_API_SCRECT
})