import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='overflow-hidden mx-fit  border-t-2 border-gray-100'>
    <footer className="flex w-full bg-white text-black font-sans ">
        <div className="flex flex-col justify-between items-center mx-auto  w-full shadow-lg rounded-3xl ">
        <div className="w-11/12 p-2">
            
            <div className="flex flex-row-reverse justify-between mt-5 w-full">
                <div className="flex flex-col items-center gap-y-6 ">
                    <h5 className="text-cyan-500">Subscribe Us</h5>
                <ul className="flex flex-col">
                    <li className="">Subscribe for latest update</li>
                    <li> <form><input type="email" id="email" name="email"  placeholder="Enter your email" className="w-64 border-2 p-2 border-sky-200 rounded-md mt-3 text-black" /></form></li><br />
                    <button className=" flex justify-center items-center mx-auto  p-2 w-40 rounded-md bg-orange-500"> <a href="#">Subscribe</a></button>       
                </ul>
                </div>
                <div  className="flex flex-col items-center gap-y-6">
                    <h5 className="text-cyan-500">Explore</h5>
                    <ul className="flex flex-col gap-y-2">
                    <li className="flex items-center gap-x-2 "><FaArrowRight /> <span className='hover:text-orange-500 transition duration-300'>Home</span></li>
                    <li className="flex items-center gap-x-2 "><FaArrowRight /> <a href="/Aboutus"><span className='hover:text-orange-500 transition duration-300'>About-us</span></a></li> 
                    <li className="flex items-center gap-x-2 "><FaArrowRight /><span className='hover:text-orange-500 transition duration-300'>service</span></li>
                    <li className="flex items-center gap-x-2 "><FaArrowRight /><span className='hover:text-orange-500 transition duration-300'>Rooms</span></li>
                    <li className="flex items-center gap-x-2 "><FaArrowRight /><span className='hover:text-orange-500 transition duration-300'>Customer review</span> </li>
                    <li className="flex items-center gap-x-2 "><FaArrowRight /> <a href="/Contectus"><span className='hover:text-orange-500 transition duration-300'>Contect-us</span></a></li>
                </ul>
                </div>
                <div className="flex flex-col items-center gap-y-6">
                    <h5 className="text-cyan-500">Contect Info</h5>
                    <ul className="flex flex-col gap-y-2">
                    <li className="flex items-center gap-x-2"><FaPhoneAlt /><span className='hover:text-orange-500 transition duration-300'>+91 9856741236</span></li>
                    <li className="flex items-center gap-x-2"><IoMdMail /><span className='hover:text-orange-500 transition duration-300'>hotelhub@gmail.com</span></li>
                    </ul>
                </div>
                <div className="">
                    <div className="flex flex-col justify-center">
                        <h5 className="text-4xl font-bold text-blue-700 overflow-hidden font">Hotel hub </h5>
                        <p className="flex flex-col justify-center mt-4" >Thank you so much guys for your</p>
                        <p> valuable time</p>
                    </div>
                    <ul className='flex gap-x-4 mt-6'>
                    <li className=""><FaFacebook size={25} className=' hover:text-blue-500'/></li>
                    <li className=""><BsTwitterX size={25} className=' hover:text-blue-800'/></li>
                    <li className=""><AiFillInstagram  size={25} className=' hover:text-pink-500'/></li>
                    <li className=""><FaLinkedin size={25} className=' hover:text-blue-700'/></li>
                    </ul>
                </div>
            </div>
            </div>
        <div className="flex  w-[1500px] ml-4 mb-4 mt-10 ">
            <div >
            <p className="copyright font-sans"> copyright &copy; 2023 Hotel Hub . All Rights Reserved.</p>
            </div>
        </div>
        </div>
    </footer>
</div>
  )
}

export default Footer