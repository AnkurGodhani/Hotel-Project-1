import { Avatar } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const {user} = useSelector((state)=>state.auths)
  return (
    <div className="container w-[600px] px-4 py-8 ml-[350px]">
      <h1 className="text-4xl font-bold mt-4 ml-[200px] font1"> Profile</h1>
      <div class=" p-6 rounded-lg  max-w-4xl mx-auto mt-4">
        <div class="flex items-center -ml-[30px] justify-start  bg-gray-200 w-[570px] h-[130px] rounded-lg shadow">
            <div class="flex items-center justify-center mx-auto gap-x-3">
                 <Avatar sx={{ width: 56, height: 56 }}>{user.Name.slice(0,1)}</Avatar>
                <div>
                    <p class="text-gray-600">Welcome back,</p>
                    <h1 class="text-2xl font-bold text-gray-900">{user.Name}</h1>
                </div>
            </div> 
        </div>
        </div>

        <div className="bg-gray-200 shadow-md rounded-lg px-4 -ml-[7px] pt-6 pb-8 mb-4 mt-[5px]">
         
          <div className="mb-1 flex ">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:<span className="text-gray-900">{user.email}</span></label>
            <div className=" ml-[260px]">
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700">Gender:<span className="text-gray-900">{
                              user.sex ? user.sex : "-"
                          }</span></label>
            </div>
            
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone: <span className="text-gray-900">{user.contact_no}</span></label>
            
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address: <span className="text-gray-900">{user.locations}</span></label>
            
          </div>
        </div>
        <div className='flex justify-center items-center'>
            <button className='flex border-2 w-[60px] bg-gray-100 rounded-lg '><span className='flex ml-2 font-serif font-semibold'><a href="/Usersettings">Edit</a></span></button>
          </div>
     
    </div>
  )
}

export default UserProfile;
