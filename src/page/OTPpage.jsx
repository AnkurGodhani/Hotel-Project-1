import React from 'react'
import OtpInput from 'react-otp-input'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { singup } from '../service/opretions/authOpretion';

const OTPpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');


  const {singupData} = useSelector((state)=>state.auths)

   const Name = singupData.get("Name")
   const contact_no = singupData.get("contact_no")
   const email = singupData.get("email")
   const password = singupData.get("password")
   const cpassword = singupData.get("cpassword")
   const responce = singupData.responce

   console.log("responce",responce)

  const onsubmits = (e) =>{
      e.preventDefault()
      responce.confirm(otp).then((result)=>{
        const user = result.user

      }).catch((error)=>console.log("error",error))
      dispatch(singup(Name,contact_no,email,password,cpassword  ,otp,navigate))
  }

  return (
    <div>
          <div className='flex flex-col justify-center items-center shadow-current p-10 shadow-lg '>
                    <h1 className='text-3xl font-bold text-green-800 select-none uppercase'>Wecome Otp Page</h1>
                    <form onSubmit={onsubmits}  className='m-5'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderInput={(props) => <input {...props} placeholder='-' style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }} className="w-[48px] lg:w-[60px] border-0 bg-gray-500 rounded-[0.5rem] text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-500 mx-2"  containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                          }} />}
                        />
                        <button type="submit"
                        className="w-full bg-yellow-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900" >
                                 Verify Email
                        </button>
                    </form>
                </div>
    </div>
  )
}

export default OTPpage