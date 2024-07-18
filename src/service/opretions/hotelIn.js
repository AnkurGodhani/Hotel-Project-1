import { toast } from "react-toastify";
import { authEndpoint, bookingEndpoint, hotelEndpoint } from "../api";
import { apiConneter } from "../apiConeter";



export async function gethotel(){
    try {
        var result = [];

        const responce = await apiConneter("GET",authEndpoint.HOTEL_ALL_INFO,null);

        console.log("HOTEL_ALL_INFORMATION_API..",responce);

        if(!responce.data.sucess){
            throw new Error(responce.data.message)
        }

        result = responce.data.hotelsInfo
        console.log("result of hotel",result)
        console.log("sucessFully Facting of hotel information")

        return result
    } catch (error) {
        console.log("internal hotel Error",error)
    }
}

export async function singlehotel(hotelId,token){
    let result= [];
    try {
        const responce = await apiConneter("POST",hotelEndpoint.GET_SINGLE_HOTEL_API,{hotelId},{
            Authorization: `Bearer ${token}`
        })  

        console.log("SINGLE_HOTEL_API_RESPONCE",responce);

        if(!responce.data.sucess){
            throw new Error(responce.data.message)
        }
        // console.log("hello")
        result = responce?.data?.data
        console.log("result",result)
        console.log("sucessFully Feching OF hotel Information.")

    } catch (error) {
        console.log("not avilble of hotels",error)
    }
    return result;
}

export async function RoomBook(data,paymentId,token,navigate){
       console.log("paymentId.......",paymentId)
       data.append("paymentId",paymentId)
    try {
        const responce = await apiConneter("POST",hotelEndpoint.BOOK_ROOM_API,data,{
            "content-type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        })

        if(!responce.data.sucess){
            throw new Error(responce.data.message)
        }

        console.log("ROOMBOOKING API RESPONCE......",responce.data)

        toast.success("Booking Sucessfully.")
        navigate("/")
    } catch (error) {
        console.log("already Booking Of Rooms....",error)
        toast.error("not booking")
    }
}

export async function RegsisterHotel(data,token){
  
      
        const toastId = toast.loading("Processing......")
        console.log("regsister hotel dtata",data)
         try {
            const responce = await apiConneter("POST",hotelEndpoint.RESISTER_OF_HOTELS,data,{
                "content-type":"multipart/form-data",
                Authorization: `Bearer ${token}`
            })

            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }

            console.log("REGSISTER HOTEL API RESPONCE..",responce.data)

            toast.success("hotel is Regsister.")
         } catch (error) {
             console.log("HOTEL CRATING ERROR...",error)
             toast.error("hotel is regsister")
         }
         toast.dismiss(toastId)
    
}

export async function getuserbooking(token){
     let result =[]
    const toastId = toast.loading("process....")
     try{
        const responce = await apiConneter("GET",bookingEndpoint.GET_USER_BOOKING_API,null,{
            Authorization: `Bearer ${token}`
        })

        if(!responce.data.success){
            throw new Error(responce.data.message)
        }

        console.log("RESPONCE OF BOOKING API....",responce.data)

        result = responce?.data?.userticket
        toast.success("your tickrts")

     }catch(error){
         console.log('INTERNAL NOT FACHING OF DATA',error)
         toast.error("INTERNAL NOT FACHING OF DATA")
     }
     toast.dismiss(toastId)
     return result
}

export async function getallbookings(token){
    let result =[]
    try {
        const responce = await apiConneter("GET",bookingEndpoint.GET_ADMIN_BOOKING_API,null,{
            Authorization: `Bearer ${token}`
        })

        if(!responce.data.success){
            throw new Error(responce.data.message)
        }

        console.log("GET ALL BOOKING RESPONCE API.......",responce.data)
        result = responce?.data?.data
        toast.success("booking fetch")
    } catch (error) {
        console.log("INTERNAL SERVER ERROR",error)
        toast.error("INTERNAL SERVER ERROR")
    }
    return result
}

export function EditBooking(data,token,navigate){
    return async()=>{
        try {
            const responce = await apiConneter("PUT",bookingEndpoint.PUT_ADMIN_EDIT_BOOKING_API,data,{
                Authorization: `Bearer ${token}`
            })
    
            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }
    
            console.log("EDIT_ADMIN_BOOK_API",responce.data)

            toast.success("Edit sucessfully")
            navigate("/deshbord/booking")
        } catch (error) {
            toast.error("Not upadte a booking.")
            console.log("not edit booking",error)
        }

    }
}
