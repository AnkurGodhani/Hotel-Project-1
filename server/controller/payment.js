const { default: mongoose } = require('mongoose')
const { instance } = require('../database/rezorpay')
const hotel = require('../model/hotel')
const crypto = require('crypto')
const paymentOrder = require('../model/paymentOrder')
const booking = require('../model/booking_of_rooms')

exports.capturepayment = async (req,res) =>{
    const {hotelId,BookingId} = req.body

    let total_amount = 0
    
    if(hotelId.length === 0){
        return res.state(400).json({
            sucess:false,
            message:"hotel is not avilble."
        })
    }

        try {
           const hotelInfo = await hotel.findById(hotelId)
            if(!hotelInfo){
                return res.state(401).json({
                    sucess:false,
                    message:"hotel is not Found."
                })
            }
        total_amount +=hotelInfo.Price

        } catch (error) {
             console.log(error)
            return res.status(500).json({ sucess: false, message: error.message })
        }

        let options = {
            amount : total_amount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        }

        try {
            let paymentResponce = await instance.orders.create(options)
            console.log(paymentResponce)

            const payments=await paymentOrder.create({
                userid:req.user.id,
                amount:total_amount,
                hotelId:hotelId,
                currency:paymentResponce.currency,
                order_Id:paymentResponce.id,
                statusof:paymentResponce.status,
                BookingId
            })

            await booking.findByIdAndUpdate(BookingId,{
                paymentId:payments._id
            })


            res.json({
                sucess:true,
                data:paymentResponce
            })

            
        } catch (error) {
            console.log(error),
            res.status(500).json({ sucess: false, message: "Could not initiate order." })
        }
}

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const hotelId = req.body?.hotelId
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !hotelId ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SCRECT)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ sucess: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ sucess: false, message: "Payment Failed" })
}

exports.adminpaymentData = async (req,res) =>{
    try {

        const accountType = req.user.accountType

        if(!accountType){
            return res.status(401).json({
                sucess:"you are wrong! path 🤔🤔"
            })
        }
        const responce = await paymentOrder.find({}).populate("BookingId").populate("userid").populate("hotelId")

        console.log("responce",responce)

        if(!responce){
            return res.status(400).json({
                sucess:false,
                message:"!oops not payment is Not Found.",
               
            })
        }

        return res.status(200).json({
            sucess:true,
            message:"data is sucessfull facing.",
            data:responce
        })
    } catch (error) {
        console.log("internal error",error)
        return res.state(500).json({
            sucess:false,
            message:"error"
        })
    }
}