import React from 'react'
import { getAuth, signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { app } from './Firbase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginuserWithGoogle, signupWithGoogles } from '../opretions/authOpretion';
import { FcGoogle } from "react-icons/fc";

const LoginFirbase = () => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const handleonGoogle = async () =>{
        try{
         
            const provider = new GoogleAuthProvider();

            const auth = getAuth(app);
           
            const result = await signInWithPopup(auth,provider)
           
            console.log("Google Authorize...",result.user.email);
            dispatch(loginuserWithGoogle(result.user.email,nagivate));
           
        }catch(error){
            console.log("not ,Providering Of Google Authrization....",error);
        }
    }
  return (
    <div>     
        <button type="button" onClick={handleonGoogle} className='flex mx-auto mt-1 items-center gap-x-5 font-semibold p-2.5  border border-gray-500 w-full justify-center rounded-lg bg-white  hover:bg-gray-200'>
            <FcGoogle size={25} /> Google
        </button>
    </div>
  )
}

export default LoginFirbase