
import { toast } from "react-toastify";
import { RatingOfEndpoint } from "../api"
import { apiConneter } from "../apiConeter"


export async function allRatingAndReviews(){
   
        let result = []

        try {
            const responce = await apiConneter("GET",RatingOfEndpoint.ALL_RATING_OF_USER,null);
            console.log("RESPONCE OF RATING AND REVIWE OF API",responce);

            if(!responce.data.sucess){
                throw new Error(responce.data.message);
            }

            result = responce.data.ratings
            console.log("console of Result:",result)

            console.log("sucessFully Fecting Of Information",responce);
            
        } catch (error) {
            console.log("error",error)
            console.log("Not Rating OF user.")
        }
        return result;
    
}

export async function avrageRating(hotelId){
    let Rating = ""
    try {
        
        const responce = await apiConneter("POST",RatingOfEndpoint.AVRANGE_RATING_HOTEL,{hotelId});
        
        console.log("Finding of AvrangeRating OF hotel",responce)

        if(!responce.data.sucess){
            throw new Error(responce.data.message);
        }

        Rating = responce.data
        console.log("console of Result:",Rating)

        console.log("sucessFully Fecting Of hotel Rating",responce);
    } catch (error) {
        console.log("not Getting a avarangeRating..",error)
    }
    return Rating
}

export function RatingOfUser(data,token){
    return async() =>{
        try {
            const responce = await apiConneter("POST",RatingOfEndpoint.USER_RATING_AND_REVIEW,data,{
                Authorization: `Bearer ${token}`
            })

            console.log("Rating And Review SucessFull",responce)

            if(!responce.data.sucess){
                
                throw new Error(responce.data.message)
            }

            toast.success("Rating is SucessFull")
        } catch (error) {
            console.log("not Ratking of user.",error)
            toast.error("already Rating",{
                theme: "dark"
              })
        }
    }
}