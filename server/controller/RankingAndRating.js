const RatingandReview = require("../model/RatingandReview");
const User = require("../model/User");
const _ = require("lodash")
const hotel = require("../model/hotel");


exports.RatingandReview = async (req,res) =>{
    try {

        const user = req.user.id;
        console.log(user)

        const {Rating,Review,hotels} = req.body;
        console.log(Rating,Review,hotels)

        if(!user || !Rating || !Review || !hotels){
            return res.status(400).json({
                sucess:false,
                message:"All Filed Requied."
            })
        }

      

        const notBooking = await User.findById(user)
        // console.log(notBooking)
        notBooking.hotelInfo.map((items)=>{
            let ok = _.toString(items)
            if(hotels !== ok){
                return res.status(400).json({
                    sucess:false,
                    message:"Not Booking You Hotels."
                })
            }
        })

        const hostel = await hotel.findById(hotels).populate("RatingandReview")
        // console.log(hostel.RatingandReview.map((items)=> items.user))    

        var users = hostel.RatingandReview.map((items)=> items.user)
        for(var i=0; i<hostel.RatingandReview.length; i++){
            console.log("okd",users[i])
            console.log(user)
            if(users[i] == user){
               return res.status(400).json({
                    sucess:false,
                    message:"Already Rating Of Hotels."
                })
                break
            }
        }

        const RatingandReviews = await RatingandReview.create({
            user:user,
            Rating,
            Review,
            hotels
        })

        await hotel.findByIdAndUpdate(hotels,{
            $push:{
                RatingandReview:RatingandReviews._id
            }
        }).populate("RatingandReview")

       return res.status(200).json({
            sucess:true,
            message:"sucessFully Rating Of Hotels.",
            RatingandReviews
        })

    } catch (error) {
        console.log("Not Rating _Of_Review",error)
        return res.status(500).json({
            sucess:false,
            message:"Internal Rating of hotel Error."
        })
    }
}

exports.allRatingAndReview = async (req,res) =>{
    try {

        // TODO : this a populast of user and hotels Information is fetching
        const ratings = await RatingandReview.find({}).populate("user").populate("hotels");

        if(!ratings){
            return res.status(401).json({
                sucess:false,
                message:"any user Not Rating Of hotels"
            })
        }

        return res.status(200).json({
            sucess:true,
            message:"Rating Of users.",
            ratings
        })
    } catch (error) {
        console.log("Not Rating _Of_Review",error)
        return res.status(500).json({
            sucess:false,
            message:"Internal Rating of hotel Error."
        })
    }
}

exports.Avergerating = async(req,res) =>{
    try {
        const hotelId = req.body.hotelId
        console.log("hotelId of id",hotelId)
        const responce = await hotel.findById(hotelId,{RatingandReview:true}).populate({
            path:"RatingandReview",
            populate:{
                path:"user"
            }
        });

        let RatingofHotel = 0
        let Rating5 = 0
        let Rating4 = 0
        let Rating3 = 0
        let Rating2 = 0
        let Rating1 = 0
        
  


        
        
        responce.RatingandReview.map((items)=>{
                    RatingofHotel += parseInt(items.Rating)
                    if(items.Rating == 5){
                        Rating5 +=1
                    }
                    if(items.Rating == 4){
                        Rating4 += 1
                        console.log(Rating4)
                    }
                    if(items.Rating == 3){
                        Rating3 += 1
                    }
                    if(items.Rating == 2){
                        Rating2 += 1
                    }
                    if(items.Rating == 1){
                        Rating1 += 1
                    }
             })
        
        const finalRating = RatingofHotel / parseInt(responce.RatingandReview.length)
        const Review5 = Rating5 / parseInt(responce.RatingandReview.length) * 100
        const Review4 = Rating4 / parseInt(responce.RatingandReview.length) * 100
        const Review3 = Rating3 / parseInt(responce.RatingandReview.length) * 100
        const Review2 = Rating2 / parseInt(responce.RatingandReview.length) * 100
        const Review1 = Rating1 / parseInt(responce.RatingandReview.length) * 100

       

        if(!responce){
            return res.status(400).json({
                sucess:false,
                message:"not found rating"
            })
        }

        if( responce.RatingandReview.length === 0){
            return res.status(200).json({
                sucess:true,
                message:"rating is facing sucessfully.",
                responces:responce,
                finalRating:0,
                star5:Rating5,
                star4:Rating4,
                star3:Rating3,
                star2:Rating2,
                star1:Rating1,
            })
        }

        console.log("finalRating",finalRating)
        console.log("finalRating5",Review5)
        console.log("finalRating4",Review4)
        console.log("finalRating3",Review3)
        console.log("finalRating2",Review2)
        console.log("finalRating1",Review1)
        
        return res.status(200).json({
            sucess:true,
            message:"rating is facing sucessfully.",
            responces:responce,
            finalRating:finalRating,
            star5:Review5,
            star4:Review4,
            star3:Review3,
            star2:Review2,
            star1:Review1,
        })
        
    } catch (error) {
        console.log("Internal Not Fecing of RatingAndReview..",error)
        return res.status(500).json({
            sucess:false,
            message:"Internal Not Fecing of RatingAndReview"
        })
    }
}
