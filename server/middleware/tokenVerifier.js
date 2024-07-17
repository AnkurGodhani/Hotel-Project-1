const jwt = require("jsonwebtoken");
const User = require("../model/User");
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        console.log(token)

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SCRECT);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            console.log(err)
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}
exports.isAdmin = async(req,res,next) =>{
    try {
       
        if((req.user.accountType) !== "Admin"){
            return res.status(400).json({
                sucess:false,
                message:"Onely accessing the Admin."
            })
        }
        next();
    } catch (error) {
        console.log("Aunthorize User.",error)
    }
}

exports.isCustomer = async(req,res,next) =>{
    try {
       
        if((req.user.accountType) !== "customer"){
            return res.status(400).json({
                sucess:false,
                message:"Onely accessing the customer."
            })
        }
        next();
    } catch (error) {
        console.log("Aunthorize User.",error)
    }
}