require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.SMSSENDER = async(number,message) =>{
    try {
        client.messages
        .create({
            body: `${message}`,
            from: '+19033458297',
            to: `+91${number}`
        }).then(()=>console.log(
            "sendding the sms sucessfully.")).catch(()=>console.log("not sending the sms"))

    } catch (error) {
        console.log("Not Sending SMS for cilent.",error)
    }
}
