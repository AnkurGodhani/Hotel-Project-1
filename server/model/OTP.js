const mongoose = require("mongoose")
const { SMSSENDER } = require("../util/messageSeder")

const OTPSchema = new mongoose.Schema({
    contact_no:{
        type:Number,
        required:true
    },
    otp:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        default: Date.now(),
        expires: 5 * 60
    }
})

async function smsVerifier(number,otp){
     try {
        const smsSending = await SMSSENDER(
             number,
            `Don't share otp${otp}.`
        )
        console.log("Sending the SMS SucessFully.",smsSending)
     } catch (error) {
        console.log("can`t Sending the otp sms.")
         throw error
     }
}

OTPSchema.pre("save",async function(next){
    if(this.isNew){
        await smsVerifier(this.contact_no,this.otp)
    }
    next();
})

module.exports = mongoose.model("OTP",OTPSchema)