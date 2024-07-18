

import React from 'react'
import { getAuth, signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { app } from './Firbase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupWithGoogles } from '../opretions/authOpretion';
import { FcGoogle } from "react-icons/fc";


const FirbasrAuth = () => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const handleonGoogle = async () =>{
        try{
         
            const provider = new GoogleAuthProvider();
            console.log("ok1",provider)
            const auth = getAuth(app);
            console.log("ok2",auth)
            const result = await signInWithPopup(auth,provider)
           
            console.log("Google Authorize...",result.user.displayName);
            dispatch(signupWithGoogles(result.user.displayName,result.user.email,nagivate))
           
        }catch(error){
            console.log("not ,Providering Of Google Authrization....",error);
        }
    }
  return (
    <div>
        <button type="button" onClick={handleonGoogle} className='flex mx-auto mt-4 items-center gap-x-5 font-semibold p-2.5  border border-gray-500 w-full justify-center rounded-lg hover:bg-gray-100'>
            <FcGoogle size={25} /> Google
        </button>
    </div>
  )
}

export default FirbasrAuth