const nodemailer = require("nodemailer")
require('dotenv').config();

exports.sendingMail = async(body,from,to,subject) =>{
    try {
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_GATWAY,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:false
        })

       let info = await transpoter.sendMail({
          from:`${from}`,
          to:`${to}`,
          subject:`${subject}`,
          html:`${body}`
       })

       console.log("sending mail responce",info)
       return info;
    } catch (error) {
        console.log("internal not sending Mail",error)
    }
}
