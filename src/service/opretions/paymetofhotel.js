import { toast } from "react-toastify"
import { apiConneter } from "../apiConeter"
import { paymentEndpoint } from "../api"
import { RoomBook } from "./hotelIn"

function loadScript(src) {
    return new Promise((resolve) => {
  console.log("src",src)

      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        console.log("src",src)
        resolve(true)

      }
      script.onerror = () => {
        resolve(false)
  console.log("src",src)

      }
      document.body.appendChild(script)
      console.log( document.body.appendChild(script))
    })
  }

export async function booking(bookData,hotelId,user_detail,token,navigate){
    try {

        console.log("token",hotelId)

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        console.log("aavigayo")

        if(!res){
            toast.error("Razorpay is loading is failed")
            return
        }

        const responce = await apiConneter("POST",paymentEndpoint.HOTEL_PAYMENT_BOOK,{hotelId},{
            Authorization: `Bearer ${token}`
        })

        if(!responce.data.sucess){
            throw new Error(responce.data.message)
        }

        console.log("PAYMENT HOTEL SUCESSFULLY",responce.data)

        const options = {
            key:"rzp_test_0aihyENNcQWG1l",
            currency: responce.data.data.currency,
            amount: `${responce.data.data.amount}`,
            order_id: responce.data.data.id,
            name: "hotelKings",
            description: "Thank you for Purchasing the Course.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl15A76ZF6_1I2xFfF7Lh44kWAp0GZqwP6LQ&s",
            prefill: {
              name:`${user_detail.Name}`,
              email:`${user_detail.email}`,
            },
            handler: function (response) {
              RoomBook(bookData,response.razorpay_order_id,token,navigate)
              verifyPayment({ ...response, hotelId }, token)
            },
          }

          const paymentObject = new window.Razorpay(options);

          paymentObject.open()
          paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.")
            console.log(response.error)
    })
        
    } catch (error) {
        console.log("PAYMENT API ERROR............", error)
        toast.error("Could Not make Payment.")
    }
}

async function verifyPayment(bodyData, token) {
    const toastId = toast.loading("Verifying Payment...")
    try {
      const response = await apiConneter("POST",paymentEndpoint.HOTEL_PAYMENT_VERIFIRY_PAYMENT, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.sucess) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful..... ")
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
  }

export async function adminPaymentdetail(token){
        let result = []
         try {
            const responce = await apiConneter("GET",paymentEndpoint.PAYMENT_DETAIL_API,null,{
              Authorization: `Bearer ${token}`
            })

            if(!responce.data.sucess){
               throw new Error(responce.data.message)
            }

            console.log("ALL PAYMENT DETAIL IS FACING.......",responce.data)

            result = responce?.data?.data

            toast.success("PAYMENT IS FECING...",{
               position:"bottom-right"
            })
         } 
         catch (error) { 
            console.log("internal server error",error)
            toast.error("INTERNAL SERVER ERROR",{
              position:"bottom-right"
            })
         }
         return result
}

export async function findbookingpayment(bookingId,token){
   
      let result = []
      try {
         const responce = await apiConneter("POST",paymentEndpoint.FIND_BOOKING_PAYMENT_COMPLETE_API,{bookingId},{
            Authorization: `Bearer ${token}`
         })

         if(!responce.data.success){
            throw new Error(responce.data.message)
         }

         result = responce.data
         console.log("FIND BOOKING PAYMENT API...",responce.data)

         toast.success("Booking conformation")
      } catch (error) {
         console.log("FIND BOOKING PAYMENT ERROR USER",error)
         toast.error("Not Booking")
      }
      return result
}