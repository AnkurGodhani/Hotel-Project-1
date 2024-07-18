import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { gethotel } from '../../service/opretions/hotelIn'
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Chip,  Rating } from '@mui/material';
import { IoLocationSharp } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { HiMiniCursorArrowRipple } from "react-icons/hi2";
import {IoLocationOutline} from "react-icons/io5"
import {IoCalendarClearOutline} from "react-icons/io5"

const Hotel = () => {
    const [search,setsearch] = useState('')

    console.log("result of search",search)

    const handleonsearch = (data) =>{
        setsearch(data)
    }
    const gethotels = async () => {
        try {
            const responce = await gethotel();
            console.log("Responce OF Hotels", responce)
            return responce
        } catch (error) {
            console.log("Error For Getting Of Hotels", error)
        }
    }
    const { isLoading, data: hotel } = useQuery({ queryKey: ["hotels"], queryFn: gethotels,staleTime:150000,cacheTime:150000 })

     if(isLoading) return <div className='flex items-center justify-center mt-[23%] ml-[48%] loader'></div>

    


    return (
        <div className='flex flex-col relative top-[100px] p-0.5 gap-y-5'>
         {/* search Functionlices of hotel Finder  */}
            <div className='bg-blue-300 p-4 '>
                <form className="w-9/12 flex justify-center items-center mx-auto p-2 gap-x-16">
                <div className=' w-full'>
                    <p className="flex ml-5 text-xs text-slate-400"> Desired city</p><IoLocationOutline className=" absolute mt-4 ml-2" />
                     <input type="text" onChange={(e)=>handleonsearch(e.target.value)} className="flex date-input border-2 px-10 border-sky-100 bg-slate-50 mt-1 rounded-md  h-[40px] w-full" placeholder='Enter hotel Address and placeLocation.....'/>
                </div>

                <div className="flex flex-col">
                    <p className="flex  text-xs text-slate-400 ">Check-in</p>
                    <IoCalendarClearOutline className=" mt-8 ml-2  absolute" />
                    <input type="date" min="2024-6-27" max="2024-12-31" className="flex date-input border-2 px-10 border-sky-100 bg-slate-50 mt-1 rounded-md w-[170px] h-[40px]"/>
                </div>
                <div>
                    <p className="flex text-xs text-slate-400">Check-Out</p><IoCalendarClearOutline className="flex mt-4 ml-2 absolute"/>
                    <input type="date" id="Check-out" name="Check-out" className="flex border-2 px-10 border-sky-100 bg-slate-50 mt-1 rounded-md w-[170px] h-[40px]"/>
                </div>
                
                </form>
            </div>
            <div className=' w-9/12 flex mx-auto flex-col gap-y-5 mb-20'>
                {
                    hotel?.filter((detail)=>{
                        return search.toLowerCase() === '' ? detail : detail.place_location?.toLowerCase().includes(search)
                    }).map((hotels) => (
                        <div className='flex p-3 justify-between shadow-md rounded-lg hover:border-2 border-blue-700 bg-blue-50'>
                        <div className='flex'>
                            <div className='flex w-[350px] border-2 rounded-md overflow-hidden bg-cover object-cover'>
                                <Swiper

                                    loop={true}
                                    spaceBetween={5}
                                    className="mySwiper2"
                                >
                                    {
                                        hotels.hostel_image.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img src={image} alt="loading" className='bg-cover object-cover' width={10200} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                            <section className='flex flex-col ml-8 mt-2 gap-y-3' >
                                <div className='flex gap-x-3'>
                                    <Chip label="HOTEL" color='primary' className=' font-semibold' />
                                    {/* TODO: Rating IS Facing OF logic Bakmi  */}
                                   
                                   
                                </div>
                                <div className='flex flex-col gap-y-3 ml-3 w-full'>
                                    <h1 className=' font-bold text-2xl text-gray-850 '>{hotels?.hostelName}</h1>
                                    <span className='flex items-center gap-x-2 text-blue-500 font-bold'><IoLocationSharp size={20}/>{hotels?.place_location}</span>
                                    <p className='flex gap-x-1 text-wrap'>
                                    {
                                        hotels?.Facilities.map((item)=>(
                                            <Chip label={item} size='small'/>
                                        ))
                                    }
                                    </p>    
                                    <button type="button" className='flex items-center gap-x-2 bg-sky-500 text-white font-bold py-2 px-3 w-fit rounded-md mt-1 hover:opacity-85 transition-all duration-150 ease-linear'>
                                       <HiMiniCursorArrowRipple size={25} color='yellow'/><Link to={`/hotel/booking/${hotels?._id}`}>Book Now </Link> 
                                    </button>
                                </div>

                            </section>
                            
                        </div>
                        <div>
                            <div className='w-full flex flex-col justify-center items-center gap-y-3 p-3'>
                                <span className='flex items-center gap-x-1 text-gray-500 font-bold'><FcCheckmark size={25}/>{hotels?.Offer_and_discount === null ? hotels?.Offer_and_discount : <span>No Offer_and_discount</span>}</span>
                                
                                <span className=' bg-gray-500 p-2 rounded-md text-white font-bold'>
                                    Price : {hotels?.Price}
                                </span>
                                <Chip label={`Text_and_charges + ${hotels?.Text_and_charges ? hotels?.Text_and_charges : <p>0</p> }`} variant="outlined" color='success'/>

                                <span className='flex gap-x-1 text-red-500 font-semibold'><p className='font-bold text-green-600'>Total Room :</p>{hotels?.totalRoom.length}</span>
                                
                                <span className='font-bold gap-x-1 text-blue-900'> <samp className=' text-yellow-500'>Avilble_Room:</samp>{hotels?.totalRoom.length - hotels?.reservation_Room.length}</span>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Hotel