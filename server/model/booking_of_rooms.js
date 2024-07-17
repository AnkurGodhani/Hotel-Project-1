
const mongoose = require("mongoose")
const {sendingMail}  = require("../database/mailer")
const bookingmail = require("../mailtemp/bookingmail")


const BookingRoomSchema = new mongoose.Schema({
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotels",
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    paymentId:[{
        type:String,
        required:true
    }],
    contact_no:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        // required:true 
    },
    Number_of_room:{
        type:Number,
        required:true
    },
    identite:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    start_Room_Book_Date:{
        type:Date,
        required:true
    },
    End_Room_Book_Date:{
        type:Date,
        required:true
    },
    ExpireOfRoom:{
        type:Date
    },
    sex:{
        type:String,
        enum:["Male","Female","Other"]
    },
    NumberOfMember:{
        type:Number,
        required:true
    },
    selectRoomNo:[{
        type:Number,
        required:true
    }],
    createAt:{
        type:Date,
        default:Date.now(),
        required:true,
    }   
})


BookingRoomSchema.post('save', async function(doc,next){
    try {
        const mailResponses = await sendingMail(
             bookingmail(doc._id,doc.start_Room_Book_Date,doc.End_Room_Book_Date),
            "ankurgodhani218@gmail.com",
             doc.email,
             "Booking Room Conformation"
         
        )
        console.log("Email Respoces:",mailResponses)
     } catch (error) {
        console.log("Error Occured while sending the Email.")
        throw error;
     }
     next();
})

module.exports = mongoose.model("booking",BookingRoomSchema)
