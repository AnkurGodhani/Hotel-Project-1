import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { gethotel } from '../service/opretions/hotelIn';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SpecialPackges = () => {
    const [loading,setloading] = useState(false);
    const [results,setresults] = useState([])

    useEffect(()=>{
       async function fetchapi(){
           setloading(true)
           const result = await gethotel();
           if(result){
                setresults(result)
                console.log("result of hotels",result)
           }
           setloading(false)
       }
       fetchapi();
    },[])

    
  return (
    <div className='flex flex-col bg-slate-50 w-full'>
        <div className='mt-20 flex flex-col justify-center items-center text-center font-serif'>
             <h1 className=' text-5xl text-sky-600 font-semibold'>Special Packges With Beautiful Place Of Hotel</h1>
              <p className=' text-md text-gray-500 w-[67%] mt-5 opacity-95'>The company will pay for flights, accommodation, activities, and meals for a group of writers or influencers, showing them the best of their destination in hopes of positive articles/lots of social media coverage</p>
        </div>
        <div className='w-11/12 grid grid-cols-3 gap-5 mx-auto p-8'>
            {
                loading ? (<div><Box sx={{ width: 300 }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box></div>) : results.length > 0 ? (
                    results.map((hotels)=>(
                        <div key={hotels._id} className='flex flex-col items-center justify-center shadow-lg rounded-md p-4 group gap-y-3' data-aos="slide-left">
                            <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
                                    {
                                        hotels.hostel_image.map((image,index)=>(
                                        <SwiperSlide key={index}>
                                            <img src={image} alt="loading" className=' hover:scale-125 transition-transform duration-300 ease-linear object-cover bg-cover overflow-hidden'/>
                                        </SwiperSlide>
                                        ))
                                    }
                            </Swiper>
                            <h1 className='text-xl text-gray-700 opacity-95 group-hover:text-sky-600 font-bold '>{hotels.place_location} - {hotels.hostelName}</h1>
                            <p className='text-md text-wrap text-gray-500 w-[95%]  opacity-95'>{hotels.Description}</p>
                             <strong className='text-lg font-bold text-sky-600 group-hover:text-gray-600'>Price:{hotels.Price}</strong>
                             <button className='w-full border-2 p-4 bg-sky-600 text-white font-semibold rounded-md hover:bg-white hover:border-sky-600 hover:text-sky-600 transition-colors duration-200 ease-linear'>
                                    BOOKING NOW 
                             </button>
                        </div>
                    ))
                ) : (<div> hotels is Not Founed </div>)
            }
        </div>
    </div>
  )
}

export default SpecialPackges