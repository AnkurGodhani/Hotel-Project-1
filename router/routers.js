const express = require("express");
const router = express.Router();


const { sendotp, signup, login, ResetPassword, signupWithGoogle, loginWithGoogle , changeprofile, updatepassword,alluser } = require("../controller/Auth");
const { auth, isAdmin, isCustomer } = require("../middleware/tokenVerifier");
const { RegsisterHotel,RoomBooking, cancelbookign, EdithotelsInfo, getAllhotel,gethotel, findbooking, getAllbookig, EditBooking , signalPayments } = require("../controller/hostelInfo");
const { RatingandReview, allRatingAndReview ,Avergerating} = require("../controller/RankingAndRating");
const { capturepayment,verifyPayment, adminpaymentData } = require("../controller/payment");


router.get("/user",auth,isAdmin,alluser)

router.post("/otpsend",sendotp)
router.post("/singup",signup)
router.post("/googleSignup",signupWithGoogle)
router.post("/login",login)
router.post("/loginWithgoogle",loginWithGoogle)
router.put("/changeProfile",auth,changeprofile)
router.put("/changepassword",auth,updatepassword)

router.put("/hotels/Edithotel",auth,isAdmin,EdithotelsInfo)
router.post("/admin/hotel/information",auth,isAdmin,RegsisterHotel);
router.post("/booking/rooms",auth,isCustomer,RoomBooking)
router.post("/hotel/rating",auth,isCustomer,RatingandReview)

router.get("/allReviwes",allRatingAndReview);
router.post("/avrageRating",Avergerating)

router.delete("/delete/cancelRoom",auth,isCustomer,cancelbookign)
router.get("/booking",auth,isCustomer,findbooking)
router.get("/getallbooking",auth,isAdmin,getAllbookig)
router.put("/editbooking",auth,isAdmin,EditBooking)
router.post("/forgetPassword",ResetPassword)

router.get("/allInformation",getAllhotel)
router.post("/gethotel",auth,isCustomer,gethotel)

router.post("/capturepayment",auth,isCustomer,capturepayment)
router.post("/verifyPayment",auth,isCustomer,verifyPayment)
router.get("/admin/payment",auth,isAdmin,adminpaymentData)
router.post("/bookingcomplete",auth,isCustomer,signalPayments)

module.exports = router