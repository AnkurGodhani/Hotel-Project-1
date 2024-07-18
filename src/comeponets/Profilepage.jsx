import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { LuBedDouble } from "react-icons/lu";
import { SlGrid } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { SlCreditCard } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Profilepage = () => {
    const {user} = useSelector((state)=>state.auths)
  return (
    <div className=' relative'>
        <div className=' fixed bg-white'>
        <nav className='flex  w-[250px] h-[100vh] shadow-xl'>
      <ul className='flex flex-col  border-gray-200 w-full '>
        <div className='flex '>
          <li className='  text-white text-3xl  w-full p-6'><img class="w-16 h-16 rounded-full mr-4" src="https://via.placeholder.com/150" alt="User Profile Picture"/></li>
          <div className='bg-[#8b5c7e]'>
          <button class=" flex justify-center items-center w-[95px] -ml-[110px] mt-11 text-gray-900 text-md text-base text-center border-[#8b5c7e] border-2 bg-gray-200 rounded shadow-md ">
                  <Link to="/deshbord/profile">View profile</Link>
            </button>
            </div>
            
          </div>
          {
          user?.accountType === "customer" ? (<div><li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl items-center gap-x-1'><HiOutlineHome size={25} /><Link to="/deshbord">Dashboard</Link> </li>
            <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><SlGrid size={20}/> <Link to="/deshbord/user/booking">Booking</Link></li>
            <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><SlCreditCard size={20}/><Link to="/deshbord/paymentcomplete">Payment</Link></li>
            <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><IoSettingsOutline size={20}/><Link to="/deshbord/setting">Setting</Link></li>
            <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><TbLogout size={20}/>Logout</li></div>):
            
            (<div><li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl items-center gap-x-1'><HiOutlineHome size={25} /><Link to="/deshbord">Dashboard</Link> </li>
          <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><LuBedDouble size={25}/><Link to="/deshbord/room">Rooms</Link></li>
          <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><SlGrid size={20}/> <Link to="/deshbord/booking">Booking</Link></li>
          <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><SlUser size={20}/><Link to="/deshbord/customer">Customers</Link></li>
          <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><SlCreditCard size={20}/><Link to="/deshbord/admin/payment">Payment</Link></li>
          <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><IoSettingsOutline size={20}/><Link to="/deshbord/setting">Setting</Link></li>
          <li className='flex p-3  text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg justify-start text-1xl iteams-center gap-x-1'><TbLogout size={20}/>Logout</li></div>)
          }
      </ul>
  </nav>
        </div>
     </div>
  )
}

export default Profilepage