
const BASE_URL =process.env.BASE_API_URL

export const authEndpoint ={
    LOGIN_API : "http://localhost:4000/api/v2" + "/login",
    LOGIN_GOOGLE_API: "http://localhost:4000/api/v2"  + "/loginWithgoogle",
    HOTEL_ALL_INFO : "http://localhost:4000/api/v2" + "/allInformation",
    SEND_OTP_API : "http://localhost:4000/api/v2" + "/otpsend",
    SIGNUP_API_TESTING :"http://localhost:4000/api/v2" + "/singup",
    SIGNUP_GOOGLE_API:"http://localhost:4000/api/v2" + "/googleSignup",
    CHANGE_PROFILE_USER :"http://localhost:4000/api/v2" +  "/changeProfile",
    CHANGE_USER_PASSWORD: "http://localhost:4000/api/v2" +"/changepassword",
    USER_DETAILS_API: "http://localhost:4000/api/v2" + "/user"
}

export const RatingOfEndpoint = {
    ALL_RATING_OF_USER : "http://localhost:4000/api/v2" + "/allReviwes",
    AVRANGE_RATING_HOTEL : "http://localhost:4000/api/v2" + "/avrageRating",
    USER_RATING_AND_REVIEW : "http://localhost:4000/api/v2"+"/hotel/rating"
}

export const hotelEndpoint ={
    GET_SINGLE_HOTEL_API : "http://localhost:4000/api/v2" + "/gethotel",
    BOOK_ROOM_API: "http://localhost:4000/api/v2" +"/booking/rooms",
    RESISTER_OF_HOTELS : "http://localhost:4000/api/v2" + "/admin/hotel/information"
}


export const paymentEndpoint ={
    HOTEL_PAYMENT_BOOK :  "http://localhost:4000/api/v2" + "/capturepayment",
    HOTEL_PAYMENT_VERIFIRY_PAYMENT :  "http://localhost:4000/api/v2" + "/verifyPayment",
    PAYMENT_DETAIL_API : "http://localhost:4000/api/v2" + "/admin/payment",
    FIND_BOOKING_PAYMENT_COMPLETE_API : "http://localhost:4000/api/v2" + "/bookingcomplete"

}

export const bookingEndpoint ={
    GET_USER_BOOKING_API : "http://localhost:4000/api/v2" + "/booking",
    GET_ADMIN_BOOKING_API : "http://localhost:4000/api/v2" + "/getallbooking",
    PUT_ADMIN_EDIT_BOOKING_API : "http://localhost:4000/api/v2" + "/editbooking"
}