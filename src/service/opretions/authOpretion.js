import { toast } from "react-toastify";
import { settoken,setuser } from "../../Sciles/auth";
import { authEndpoint, bookingEndpoint } from "../api"
import { apiConneter } from "../apiConeter"



export function loginuser(data,nevigaet){
    return async(dispatch) =>{
        try {
            const responce = await apiConneter("POST",authEndpoint.LOGIN_API,data);
            console.log("aa")
            console.log("LOG_API Responces.....",responce);

            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }

            
            dispatch(settoken(responce.data.token))
            localStorage.setItem("token",JSON.stringify(responce.data.token))
            localStorage.setItem("user",JSON.stringify(responce.data.user))
            nevigaet("/")
        } catch (error) {
            console.log("LOGIN_API_ERROR....",error);
            alert("Not Regsister user.")
        }    
    }
}

export function sendotp(contact_no,nevigate){
    return async() =>{
        try {
            console.log("Responce of send Data",contact_no)
            const responce = await apiConneter("POST",authEndpoint.SEND_OTP_API,{contact_no});

            console.log("RESPONCE_SEND_OTP_API",responce);

        if(!responce.data.sucess){
            throw new Error(responce.data.message)
        }

        alert("otp send");
        nevigate("/OTPpage")
        } catch (error) {
            alert("not send otp")
            console.log(error)
        }
    }
}

export function singup(data,nevigate){
    return async()=>{
        try {
            const responce = await apiConneter("POST",authEndpoint.SIGNUP_API_TESTING,data);

            console.log("RESPONCE_SEND_OTP_API",responce);
    
            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }
    
            alert("singup accessfull");
            nevigate("/login")
        } catch (error) {
            console.log("singup not acess")
            console.log(error)
            nevigate("/signup")
        }
    }
}

export function signupWithGoogles(Name,email,nevigate){
    return async()=>{
        try {
            const responce = await apiConneter("POST",authEndpoint.SIGNUP_GOOGLE_API,{Name,email});

            console.log("RESPONCE_SEND_OTP_API",responce);
    
            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }
    
            alert("singup accessfull");
            nevigate("/login")
        } catch (error) {
            console.log("singup not acess")
            console.log(error)
            nevigate("/signup")
        }
    }
}

export function loginuserWithGoogle(email,nevigaet){
    return async(dispatch) =>{
        try {
            console.log("login with Email..",email)
            const responce = await apiConneter("POST",authEndpoint.LOGIN_GOOGLE_API,{email});
            console.log("aa")
            console.log("LOG_API Responces.....",responce);

            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }

            console.log("logingin sucessFully")
            dispatch(settoken(responce.data.token))
            localStorage.setItem("token",JSON.stringify(responce.data.token))
            localStorage.setItem("user",JSON.stringify(responce.data.user))
            nevigaet("/")
        } catch (error) {
            console.log("LOGIN_API_ERROR....",error);
            alert("Not Regsister user.")
        }    
    }
}

export function updateProfile(data,token){
    return async()=>{
        const toastId = toast.loading("updating....",{
            position:"top-center"
        })
        try {
            const responce = await apiConneter("PUT",authEndpoint.CHANGE_PROFILE_USER,data,{
                Authorization: `Bearer ${token}`
            });
    
            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }
    
            console.log("UPADTE PROFILE API......",responce.data)

            localStorage.removeItem("user");
            localStorage.setItem("user",JSON.stringify(responce?.data?.up))
    
            toast.success("Profile is upadate refersh page.",{
                position:"top-center"
            })
        } catch (error) {
            console.log("UPADTE PROFILE ERROR.....",error)
            toast.error("Profile is not update",{
                position:"top-center"
            })
        }
        toast.dismiss(toastId)
    }
}

export function changepassword(data,token){
    return async()=>{
          const toastId = toast.loading("loading....")
        try{
            const responce = await apiConneter("PUT",authEndpoint.CHANGE_USER_PASSWORD,data,{
                Authorization: `Bearer ${token}`
            })

            if(!responce.data.sucess){
                throw new Error(responce.data.message)
            }

            console.log("PASSWORD CHANGE API.......",responce.data)

            toast.success("changePassword successfully.")
        }catch(error){
            console.log("Internal not change password api Error",error)
            toast.error("Not Change Password!")
        }
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return async(dispatch)=>{
        dispatch(settoken(null))
        dispatch(setuser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logout")
        navigate("/")
    }
}

export async function userAdmin(token){
    var result = []
    try {
        const responce = await apiConneter("GET",authEndpoint.USER_DETAILS_API,null,{
            Authorization: `Bearer ${token}`
        })

        if(!responce.data.success){
            throw new Error(responce.data.message)
        }

        console.log("Responce Of user Detail API...",responce.data)

        result = responce?.data?.user

        toast.success("Information of Customer!")

    } catch (error) {
        console.log("CUSTOMER IS NOT FTCHING OF API....",error)
        toast.error("Detail is Not Feching!")
    }
    return result
}

