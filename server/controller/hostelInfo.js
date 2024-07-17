const User = require("../model/User");
const hotel = require("../model/hotel");
const { uploadImage } = require("../util/imageUploder");
const booking = require("../model/booking_of_rooms")
require("dotenv").config();
const _ = require("lodash");
const mongoose = require("mongoose");
const booking_of_rooms = require("../model/booking_of_rooms");
const { json } = require("react-router-dom");
const paymentOrder = require("../model/paymentOrder");
const { sendingMail } = require("../database/mailer");



exports.RegsisterHotel = async (req, res) => {
    try {

        const userId = req.user.id;
        const { hostelName, ownderName, place_location, totalRoom, reservation_Room, contact_no, Price, Description, Facilities, Text_and_charges } = req.body
        console.log("All Data",hostelName, ownderName, place_location, totalRoom, reservation_Room, contact_no, Price, Description, Facilities, Text_and_charges)
        
        const hostel_image = req.files.hostel_image;
        console.log("hotelImage", hostel_image)

        if (!hostelName || !ownderName || !place_location || !totalRoom || !contact_no || !Price || !Description || !Facilities || !Text_and_charges || !hostel_image) {
            return res.status(400).json({
                sucess: false,
                message: "all filed are Requied."
            })
        }

        const hotelImage = await uploadImage(
                hostel_image,
                process.env.FOLDER_NAME
           );  

        var AvilbleRoom = [];

        for (var i = 1; i <= totalRoom; i++) {
            AvilbleRoom.push(i)
        }

        // console.log("avilvle Room", AvilbleRoom)
        // console.log("Facilities", Facilities[2])

        const hotelInfos = await hotel.create({
            userID: userId,
            hostelName,
            ownderName,
            place_location,
            totalRoom: AvilbleRoom,
            contact_no,
            Price,
            Facilities,
            Description,
            Text_and_charges,
            hostel_image: hotelImage.length > 1 ? hotelImage : hotelImage.secure_url
        })

        await User.findByIdAndUpdate(
            {
                _id: userId
            },
            {
                $push: {
                    hotelInfo: hotelInfos._id
                }
            },
            { new: true }
        )

        res.status(200).json({
            sucess: true,
            data: hotelInfos,
            message: "All Data is SucessFully Stored."
        })



    } catch (error) {
        console.log("Not Regsister Hostel", error);
        return res.status(500).json({
            sucess: false,
            message: "not resister your hostel"
        })
    }
}

exports.RoomBooking = async (req, res) => {
    try {

        const userId = req.user.id;
        console.log("user id aache", userId)
        // console.log(req.body)
        const { Name, contact_no, email, Number_of_room, age, start_Room_Book_Date, End_Room_Book_Date, ExpireOfRoom, sex, NumberOfMember, selectRoomNo, hotelId ,paymentId } = req.body;

        const identite = req.files.identite;
        console.log("identite",identite)


        // console.log(Name, contact_no, email, Number_of_room, age, start_Room_Book_Date, End_Room_Book_Date, ExpireOfRoom, sex, NumberOfMember, selectRoomNo, hotelId)

        if (!Name || !contact_no || !Number_of_room || !identite || !start_Room_Book_Date || !End_Room_Book_Date || !sex || !NumberOfMember || !selectRoomNo || !age || !hotelId || !email || !paymentId) {
            return res.status(400).json({
                sucess: false,
                message: "All Filed Required."
            })
        }

        const user = await User.findById(userId)
        console.log(user)

        if (user.accountType === "Admin") {
            return res.status(400).json({
                sucess: false,
                message: "Not Acessing of The Service"
            })
        }
        console.log("hotelId", hotelId)
        const hotelRoom = await hotel.findById(hotelId);
        console.log("hostel All Informations", hotelRoom)

        if (!hotelRoom) {
            return res.status(400).json({
                sucess: false,
                message: "Not Exitting the hotel."
            })
        }

        var room = _.toNumber(selectRoomNo)
        var chaking_of_Empty_Room = _.intersection(hotelRoom.reservation_Room, _.castArray(room))

        if (_.isMatch([], chaking_of_Empty_Room) == false) {
            const check = await booking.findOne({ selectRoomNo: selectRoomNo }).sort({ createAt: -1 }).limit(1);
            console.log("Checking Of Rooms", check, check.ExpireOfRoom)
            if (!(check.ExpireOfRoom > Date.now())) {

                await hotel.findByIdAndUpdate(hotelId, {
                    $pull: {
                        Booking_of: userId,
                        reservation_Room: selectRoomNo
                    }
                })

                await User.findByIdAndUpdate(userId, {
                    $pull: {
                        hotelInfo: hotelId,
                        BookingRoom: check._id
                    }
                })
            }
            else {
                return res.status(400).json({
                    sucess: false,
                    message: "Allready Room of Rooms!"
                })
            }
        }



        const uploading_identites = await uploadImage(
            identite,
            process.env.FOLDER_NAME
        )

        const bookings = await booking.create({
            Name,
            contact_no,
            email,
            Number_of_room,
            age,
            hotelId,
            identite: uploading_identites.secure_url,
            start_Room_Book_Date,
            End_Room_Book_Date,
            sex,
            NumberOfMember,
            selectRoomNo,
            paymentId
        })

        await booking.findByIdAndUpdate(bookings._id, {
            $push: {
                ExpireOfRoom: Date.now() + 360000
            }
        }).then(() => console.log("SucessFull Running."))

        const updateofRooms = await hotel.findByIdAndUpdate(hotelId,
            {
                $push: {
                    Booking_of: userId
                },
                $addToSet: {
                    reservation_Room: selectRoomNo,
                }
            }, { new: true }
        );

        console.log("updating of total Rooms in hotel", updateofRooms)

        const updateuesr = await User.findByIdAndUpdate(userId, {
            $push: {
                hotelInfo: hotelId,
                BookingRoom: bookings._id
            }
        }, { new: true })

        console.log("updating user Booking", updateuesr)

        const update =await paymentOrder.findOneAndUpdate({order_Id:paymentId},
            {
                $push:{
                    BookingId:bookings._id,
                }
            }
        )

        console.log("upadte payment is sucessfully.",update)


        res.status(200).json({
            sucess: true,
            message: "Booking a Room!",
            data: bookings
        })


    } catch (error) {
        console.log("Not Booking Your Rooms", error)
        return res.status(501).json({
            sucess: false,
            message: "user not Booking Your Room! Place Try Agine."
        })
    }
}

exports.cancelbookign = async (req, res) => {
    try {

        const userId = req.user.id;

        const { BookingId } = req.body;

        const booking = await booking_of_rooms.findById({ _id: BookingId }).populate({
            path: "hotelId"
        });

        if (!booking) {
            return res.status(400).json({
                sucess: false,
                message: "Not Booking is avilble"
            })
        }

        const avilbleuser = await User.findById(userId);

        avilbleuser.BookingRoom.map(async (items) => {
            if (items == BookingId) {
                const userIDs = new mongoose.Types.ObjectId(userId)

                const pullOfhotelId = await hotel.findByIdAndUpdate(booking.hotelId, {
                    $pull: {
                        Booking_of: userIDs,
                        reservation_Room: _.toString(booking?.selectRoomNo)
                    },
                }, { new: true });
                console.log("pullOfhotelId", pullOfhotelId);

                const pullUserDetails = await User.findByIdAndUpdate(userId, {
                    $pull: {
                        hotelInfo: booking.hotelId,
                        BookingRoom: BookingId
                    }
                }, { new: true }).exec();

                if (!pullUserDetails) {
                    return res.status(400).json({
                        sucess: false,
                        message: "Not Booking the Room"
                    })
                }

                console.log("pullUserDetails", pullUserDetails);

                const cancelOfBooking = await booking_of_rooms.findByIdAndDelete(BookingId);
                console.log("Deleting OF _di SucessFully", cancelOfBooking);

                res.status(200).json({
                    sucess: true,
                    message: "Cancel Room SucessFully."
                })
            }

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Aunthorize user booking acess"
        })
    }
}

exports.EdithotelsInfo = async (req, res) => {
    try {
        const { hotelId } = req.body

        const filed = req.body

        const hotels = await hotel.findById(hotelId);

        if (!hotels) {
            return res.status(400).json({
                sucess: false,
                message: "Not Regsister yor hotel."
            })
        }

        if (req.files) {
            const hotel_images = req.files.hostel_image;

            const upload = await uploadImage(
                hotel_images,
                process.env.FOLDER_NAME
            )
            hotels.hostel_image = upload.secure_url
        }



        for (const key in filed) {
            if (filed.hasOwnProperty(key)) {
                if (key === "userID" || key === "Booking_of" || key === "RatingandReview") {
                    hotels[key] = JSON.parse(filed[key])
                }
                else if (key === "totalRoom") {
                    var total = [];
                    console.log("key", filed.totalRoom)
                    for (var i = 0; i < filed.totalRoom; i++) {
                        total.push(i)
                    }
                    hotels.totalRoom = total;
                }
                else {
                    hotels[key] = filed[key]
                }
            }
        }

        await hotels.save();

        const updatehotel = await hotel.findById({ _id: hotelId });

        return res.status(200).json({
            sucess: true,
            message: "Update SucessFull",
            data: updatehotel
        })

    } catch (error) {
        console.log("Not update your hotel Innfromation Plaze Try Agine.", error)
    }
}

exports.getAllhotel = async (req, res) => {
    try {
        const hotelsInfo = await hotel.find({}).populate("RatingandReview");
        console.log(hotelsInfo)
        if (!hotelsInfo) {
            return res.status(404).json({
                sucess: false,
                message: "hotel is Not Found."
            })
        }

        res.status(200).json({
            sucess: true,
            message: "get hotel sucessfull",
            hotelsInfo
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            sucess: false,
            message: "Internal server Error"
        })
    }
}

exports.gethotel = async (req, res) => {
    try {
        const hotelId = req.body.hotelId
        console.log("hotelId", hotelId)
        const hotels = await hotel.findById(hotelId);

        if (!hotels) {
            return res.status(400).json({
                sucess: false,
                message: "hotel is not foundes"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "hotel is Found sucessFully.",
            data: hotels
        })
    } catch (error) {
        console.log("Internal Error of Servers", error)
        return res.status(501).json({
            sucess: false,
            message: "Internal Error of Servers"
        })
    }
}

exports.findbooking = async(req,res) =>{
    try {
        const user = req.user.id
        console.log("user",user)

        if(!user){
            return res.status(400).json({
                success:false,
                message:" oops! user is not found"
            })
        }

        const userticket = await User.findById(user).populate("hotelInfo").populate({
            path:"BookingRoom",
            populate:{
                path:"hotelId"
            }
        });

        console.log("book",userticket)

        if(!userticket){
            res.status(401).json({
                success:false,
                message:"invild user!"
            })
        }

        return res.status(200).json({
            success:true,
            message:"finding user booking",
            userticket
        })

    } catch (error) {
        console.log("internal not faching booking",error)
        return res.status(500).json({
            success:false,
            message:"internal not faching booking"
        })
    }
}

exports.getAllbookig = async(req,res)=>{
    try {
        const bookingDetails = await booking.find({}).populate("hotelId")

        if(!bookingDetails){
            return res.status(400).json({
                success:false,
                message:"any One not booking a hotels"
            })
        }

        return res.status(200).json({
            success:true,
            message:"successfully data feching.",
            data:bookingDetails
        })
    } catch (error) {
        console.log("oops! internal server Error",error)
        return res.status(500).json({
            success:false,
            message:"oops! internal server Error"
        })
    }
}

exports.EditBooking = async(req,res)=>{
    try {
        const {BookingId} = req.body;

        const EditData = req.body
        console.log("EditiData",EditData)
        const data = await booking.findById(BookingId);
        if(!data){
            return res.status(400).json({
                sucess:false,
                message:"oops! samething is worng 😣😣."
            })
        }

        for(const key in EditData){
            if(EditData.hasOwnProperty(key)){
                if(key === "hotelId" || key === "identite"){
                    data[key] = JSON.parse(EditData[key])
                }
                else{
                    data[key] = EditData[key]
                }
            }
        }

        await data.save();

        const checkData = await booking.findById({_id:BookingId})

        return res.status(200).json({
            sucess:true,
            message:"sccessfully Edit Data.",
            data:checkData
        })
    } catch (error) {
        console.log("Not update your Booking Innfromation Plaze Try Agine.", error)
    }

}

exports.signalPayments = async(req,res)=>{
    try {
        const user = req.user.id

        if(!user){
            return res.status(401).json({
                success:false,
                message:"not! found user"
            })
        }

        const {bookingId} = req.body

        if(!bookingId){
            return res.status(400).json({
                success:false,
                message:"not Found Tikect HRN number not found!"
            })
        }

        const payment = await paymentOrder.findOne({BookingId:bookingId}).populate("BookingId");

        if(!payment){
            return res.status(400).json({
                success:false,
                message:"server is not Found Data."
            })
        }

        res.status(200).json({
            success:true,
            message:"Booking payment is Complete!",
            payment
        })
    } catch (error) {
        console.log("Internal not feching of Data for server!",error)
    }
}