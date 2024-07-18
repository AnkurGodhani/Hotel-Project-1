
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginuser } from './service/opretions/authOpretion';
import { setloading } from './Sciles/auth';
import LoginFirbase from './service/firbase/LoginFirbase';

const Login = () => {
    const {user,loading} = useSelector((state)=>state.auths)
    const negvigate = useNavigate();
    const dispatch = useDispatch();
   const {
    register,
    handleSubmit,
    formState: {errors}
   } = useForm();


   const onsubmites = (data) =>{
        const froms = new FormData();
        froms.append("email",data.email)
        froms.append("password",data.password)
        setloading(true)
        dispatch(loginuser(froms,negvigate))
        setloading(false)
   }

  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <div className=' w-fit p-10 flex flex-col shadow-md mt-[10%] bg-blue-700 items-center rounded-md'>
            <h1 className='text-4xl m-7 text-white font-bold'>WECOME! BACK</h1>
            <form onSubmit={handleSubmit(onsubmites)} className='flex flex-col gap-y-5 w-full'>
                <label className='flex flex-col'>
                    <p className=' text-md font-semibold'>email<span className='text-red-700'>*</span></p>
                    <input type="email"  {...register("email",{required:true})} className='p-1.5 rounded mt-1 outline-none'/>
                    {
                        errors.email && <span className='text-red-700 font-semibold'>
                            Email is Requied.
                        </span>
                    }
                </label>
                <label className='flex flex-col'>
                    <p>password <span className='text-red-500'>*</span></p>
                    <input type="password" {...register("password",{required:true})} className='p-1.5 rounded mt-1 outline-none'/>
                    {
                        errors.password && <span className='text-red-700 font-semibold'>
                            password is Requied.
                        </span>
                    }
                </label>
                <button type="submit" className='flex items-center justify-center bg-orange-500 p-2 rounded-md mt-3 '>
                    LOGIN
                </button>
                <LoginFirbase />
            </form>
           
        </div>
       
    </div>
  )
}

export default Login