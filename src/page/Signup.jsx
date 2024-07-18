// src/Signup.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendotp, singup } from '../service/opretions/authOpretion';
import { setsingupData } from '../Sciles/auth';
import FirbasrAuth from '../service/firbase/FirbasrAuth';
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../service/firbase/Firbase';
import { toast } from 'react-toastify';


const Signup = () => {
   const [result,setresult] = useState(null)
   const [otp,setotp] = useState(null)
   const [PhoneNo,setPhoneNo] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState : {errors}
    } = useForm();

    const onsumbitData = async(data) =>{
       const froms = new FormData();
       froms.append("Name",data.Name)
       froms.append("contact_no",PhoneNo)
       froms.append("email",data.email)
       froms.append("password",data.password)
       froms.append("cpassword",data.cpassword)
       console.log(setsingupData(froms))
      
      //  dispatch(setsingupData(froms))
       dispatch(singup(froms,navigate))
      //  dispatch(sendotp(froms.get('contact_no'),navigate))
    }

    const onvirify =async() =>{
        try {
          const auth = getAuth(app)
          window.rerecaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha',{})
          const appVerifier = window.rerecaptchaVerifier
          console.log(PhoneNo)
          const responce = await signInWithPhoneNumber(auth,`+91${PhoneNo}`,appVerifier)
          console.log("responce",responce)
          setresult(responce)
        } catch (error) {
            toast.error("not virify your Numbers")
            console.log(error)
        }
    }
    
    const sendotps = async()=>{
      try {
         result.confirm(otp).then((result)=>alert("sucessfully verify"))
      } catch (error) {
         toast.error("invild otp")
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onsumbitData)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("Name",{required:true})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email",{required:true})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password",{required:true})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">cpassword</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("cpassword",{required:true})}
            />
          </div><div className="mb-4">
            <label className="block text-gray-700">contact_no</label>
            <div className='flex gap-x-5'>
                <input
                  type="Number"
                  onChange={(e)=>setPhoneNo(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            <button className='bg-blue-700 px-2 rounded-lg text-white font-semibold ' onClick={onvirify}>VERIFIY</button>
            </div>
            <div>
                {
                   result && <div>
                       <label>OTP CODE</label>
                       <input type="tel" onChange={(e)=>setotp(e.target.value)} className='p-2 border-2' required/>
                       <button onClick={sendotps}>SEND</button>
                   </div>
                }
            </div>
          </div>
          <div id='recaptcha' className='flex m-2 w-full'></div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
          <FirbasrAuth />
        </form>
      </div>  
    </div>
  );
};

export default Signup;
