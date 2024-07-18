import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { changepassword, updateProfile } from '../service/opretions/authOpretion';


const UserSettings = () => {

    const {user,token} = useSelector((state)=>state.auths)
    console.log(user.sex)
    const [radio,setradio] = useState(`${user.sex}`)
    console.log("radio",user.sex)

    const dispatch = useDispatch();
     const {
        register,
        handleSubmit,
        formState: {errors}
     } = useForm({
        defaultValues:{
            "Name":`${user.Name}`,
            "email":`${user.email}`,
            "contact_no":`${user.contact_no}`,
        }
     });
      const handleonsubmit = (data) =>{
          const update = new FormData();
          update.append("Name",data.Name)
          update.append("email",data.email)
          update.append("contact_no",data.contact_no)
          update.append("sex",radio)
          console.log("getdata",update.get("sex"))
          dispatch(updateProfile(update,token))
      }

      const changepasswordupdate = (data) =>{
          const change = new FormData();
          change.append("password",data.password)
          change.append("newpassword",data.newpassword)
          change.append("newcpassword",data.newcpassword)
          dispatch(changepassword(change,token))
      }
    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded shadow">
        
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Settings</h2>
            </div>

            <div className="bg-gray-50 rounded p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Profile Settings</h3>
                <form onSubmit={handleSubmit(handleonsubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700" >Full Name</label>
                        <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border rounded-md 
                        shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...register("Name",{required:true})} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border rounded-md 
                        shadow-sm focus:outline-none outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  {...register("email",{required:true})} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" name="phone" maxLength={10} className="mt-1  block w-full px-3 py-2 border rounded-md 
                        shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...register("contact_no",{required:true})} readOnly/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Gender</label>
                        <div className='flex gap-5'>
                        <input type='radio' name='male' id='Male' checked={radio === "Male" && true} onChange={(e)=>setradio(e.target.id)}/>
                        <label htmlFor='male'>Male</label>
                        </div>
                        <div className='flex gap-5'>
                        <input type='radio' name='male' id='Female' checked={radio === "Female" && true} onChange={(e)=>setradio(e.target.id)}/>
                        <label htmlFor='female'>Female</label>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <button type="submit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                        py-2 px-4 rounded">Save Changes</button>
                    </div>
                </form>
            </div>

            <div className="bg-gray-50 rounded p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Change Password</h3>
                <form onSubmit={handleSubmit(changepasswordupdate)}>
                    <div className="mb-4">
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" id="current-password" name="current-password" className="mt-1 block w-full px-3 py-2 
                        border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...register("password",{required:true})}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" id="new-password" name="new-password" className="mt-1 block w-full px-3 py-2 
                        border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  {...register("newpassword",{required:true})}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" className="mt-1 block w-full px-3 py-2 
                        border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...register("newcpassword",{required:true})}/>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                        py-2 px-4 rounded">Change Password</button>
                    </div>
                </form>
            </div>
            
        </div>
    );
};

export default UserSettings;
