const User = require("../model/User");
const bcrpty = require("bcrypt")
const otpGenretor = require("otp-generator");
const OTP = require("../model/OTP");
const jwt = require("jsonwebtoken");
const { toast } = require("react-toastify");

exports.signup = async(req,res) =>{
    try {
        const {Name,contact_no,email,password,cpassword,accountType,locations}= req.body;

        console.log(Name,contact_no,email,password,cpassword)

        if(!Name || !contact_no || !email || !password || !cpassword){
            return res.status(400).json({
                sucess:false,
                message:"All filed are requied."
            })
        }

        const exsiting= await User.findOne({email});

        if(exsiting){
            return res.status(400).json({
                sucess:false,
                message:"user is alread Exsit."
            })
        }

        if(password !== cpassword){
            return res.status(400).json({
                sucess:false,
                message:"some chareater is Enter."
            })
        }
        
        const hashpassword = await bcrpty.hash(password,10)
        const chashpassword = await bcrpty.hash(cpassword,10)
        // const response = await OTP.find({contact_no}).sort({createAt:-1}).limit(1);

        // if(response.length === 0){
        //     return res.status(400).json({
        //         sucess:false,
        //         message:"otp is invild"
        //     })
        // }
        // else if(otp !== response[0].otp){
        //     return res.status(400).json({
        //         sucess:false,
        //         message:"otp is invild"
        //     })
        // }

        const loc =await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=e9689bf8ea7446b896e68c58428e9fd1')
        .then(resp => resp.json())


        console.log("uer locations",loc.location?.latitude)
        const user = await User.create({
            Name,
            contact_no,
            email,
            password:hashpassword,
            cpassword:chashpassword,
            accountType,
            locations:[loc.location?.latitude,loc.location?.latitude]
        })

       return res.status(200).json({
            sucess:true,
            message:"user Resister SucessFully.",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal server Distications" 
        })
    }
}

exports.sendotp = async(req,res) =>{
    try {
        const {contact_no,otp} = req.body;
        console.log(contact_no)

        if(!contact_no){
            return res.status(400).json({
                sucess:false,
                message:"All filed are requied."
            })
        }
        
        const otps = otpGenretor.generate(4,{specialChars:false,lowerCaseAlphabets:false,upperCaseAlphabets:false})
        
        const otppayload = {contact_no,otp:otps}
        const sendsms = await OTP.create(otppayload)
        
        console.log("Otp is Genrating of SMS",sendsms);

        res.status(200).json({
            sucess:true,
            message:"otp is SucessFully Send.",
            otps
        })

    } catch (error) {
        console.log("Internal server Error",error)
        res.status(500).json({
            sucess:false,
            message:"Otp is Not Sending Become to Internal Server Error."
        })
    }
}

exports.login= async (req,res) =>{
    try {

        const {email,password} = req.body;
        console.log(email,password)
        if(!email || !password){
            return res.status(400).json({
                sucess:false,
                message:"All filed are Requied."
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"Go to singup!"
            })
        }

        if(await bcrpty.compare(password,user.password)){
            const token = jwt.sign({email:user.email,id:user._id,accountType:user.accountType},process.env.JWT_SCRECT,
                {
                    expiresIn:"24h"
                }
            )
           
            user.token = token
            user.password = undefined;
            user.cpassword = undefined;

            const options ={
                expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("token",token,options).status(200).json({
                sucess:true,
                message:"uesr is login sucessfully.",
                user,
                token
            })
        }
        else{
            return res.status(400).json({
                sucess:false,
                message:"Invild Password."
            })
        }
    } catch (error) {
        console.log("Login Failed Plaze Try Agin.",error)
        return res.status(500).json({
            sucess:false,
            message:"Try Login Failed Plaze Try Agin"
        })
    }
}

exports.ResetPassword = async (req,res) =>{
    try {
        const {email,password} = req.body
        
        if(!email || !password){
            return res.status(400).json({
                sucess:false,
                message:"All Filed are Requied."
            })
        }

        const user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"user is Not Exsist,palze Regsister"
            })
        }

        const hashpassword = await bcrpty.hash(password,10);

        await User.findOneAndUpdate(email,{
            $push:{
                password:hashpassword
            }
        })

        return res.status(200).json({
            sucess:true,
            message:"Password-Forget sucessFull"
        })
    } catch (error) {
        console.log("ResetPassword can`t change.",error)
    }
}

exports.signupWithGoogle = async (req,res) =>{
    try {
        const {Name,contact_no=9096558011120,email,password="123",cpassword="123",accountType,otp="4112",locations}= req.body;

        if(!Name || !contact_no || !email || !password || !cpassword    || !otp){
            return res.status(400).json({
                sucess:false,
                message:"All filed are requied."
            })
        }

        const exsiting= await User.findOne({email});

        if(exsiting){
            return res.status(400).json({
                sucess:false,
                message:"user is alread Exsit."
            })
        }

        if(password !== cpassword){
            return res.status(400).json({
                sucess:false,
                message:"some chareater is Enter."
            })
        }
        
        const hashpassword = await bcrpty.hash(password,10)
        const chashpassword = await bcrpty.hash(cpassword,10)


        const loc =await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=e9689bf8ea7446b896e68c58428e9fd1')
        .then(resp => resp.json())


        console.log("uer locations",loc.city?.name)
        const user = await User.create({
            Name,
            contact_no,
            email,
            password:hashpassword,
            cpassword:chashpassword,
            accountType,
            otp,
            locations:loc.city?.name
        })

       return res.status(200).json({
            sucess:true,
            message:"user Resister SucessFully.",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal server Distications" 
        })
    }
}

exports.loginWithGoogle = async (req,res)=>{
    try {
        const {email,password="123"} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                sucess:false,
                message:"All filed are Requied."
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"Go to singup!"
            })
        }

        if(await bcrpty.compare(password,user.password)){
            const token = jwt.sign({email:user.email,id:user._id,accountType:user.accountType},process.env.JWT_SCRECT,
                {
                    expiresIn:"24h"
                }
            )
           
            user.token = token
            user.password = undefined;
            user.cpassword = undefined;

            const options ={
                expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("token",token,options).status(200).json({
                sucess:true,
                message:"uesr is login sucessfully.",
                user,
                token
            })
        }
        else{
            return res.status(401).json({
                sucess:false,
                message:"Plaze Login with Google."
            })
        }

    } catch (error) {
            console.log("Login Failed Plaze Try Agin.",error)
            return res.status(500).json({
                sucess:false,
                message:"Try Login Failed Plaze Try Agin"
            })
    }
}

exports.changeprofile = async (req,res) =>{
    try{
        const user = req.user.id
        console.log("user",user)
        
        const filter = req.body
        console.log(filter)
    
        const active = await User.findById(user)
    
        if(!user){
            return res.status(401).json({
                sucess:false,
                message:"user is not fount"
            })
        }
    
        for(const key in filter){
            if(filter.hasOwnProperty(key)){
                if(key === "BookingRoom" || key === "hotelInfo" || key === "token" || key === "accountType"){
                    active[key] = JSON.parse(filter[key])
                }
                else{
                     active[key] = filter[key]
                }
            }
        }
         
        await active.save();

        const up =await User.findById(user)
    
        return res.status(200).json({
            sucess:true,
            message:"sucessfully Upadte Profile.",
            up
        })
    }
    catch(error){
        console.log("Internal Not Change Profile",error)
        res.status(500).json({
            sucess:false,
            message:"Internal Not Change Profile"
        })
    }
}

exports.updatepassword = async (req,res) =>{
   try {
    const user = req.user.id
    const {password,newpassword,newcpassword} = req.body
    if(!user){
        return res.status(200).json({
           sucess:false,
           message:"user is undefined!😣😣😣😣"
        })
    }

    const update = await User.findById(user);

    if(!update){
       return res.status(401).json({
           sucess:false,
           message:"user invild."
       })
    }

    if(newpassword !== newcpassword){
        return res.status(400).json({
            sucess:false,
            message:"chareter is not some!"
        })
    }
  
  const hashnewpassword = await bcrpty.hash(newpassword,10)
  const hashnewcpassword = await bcrpty.hash(newcpassword,10)

   if(await bcrpty.compare(password,update.password)){
        const upadatepassword = await User.findByIdAndUpdate(user,{
               password:hashnewpassword,
               cpassword:hashnewcpassword
        })

        return res.status(200).json({
           sucess:true,
           message:"password is successfully Change.",
           upadatepassword
        })
   }
  
       return res.status(400).json({
           sucess:false,
           message:"invild password"
       })
   
   } catch (error) {
      console.log("not change password",error)
  }

}

exports.alluser = async(req,res)=>{
    try {
        const user = await User.find({}).populate({
            path:"BookingRoom",
            populate:{
                path:"paymentId"
            }
        })

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user is Not Found!"
            })
        }

        res.status(200).json({
            success:true,
            message:"all user In data",
            user
        })
    } catch (error) {
        console.log("Internal Network Error",error)
    }
}
