import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { singlehotel } from '../../service/opretions/hotelIn';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import Login from '../../Login'

import { SwiperSlide,Swiper } from 'swiper/react';
import { EffectFade,Pagination ,Navigation} from 'swiper/modules';
import { Rating } from '@mui/material';
import { avrageRating } from '../../service/opretions/Rating_Reviews';

import CustomerView from '../../page/CustomerView';
import GoogleMaphotel from '../../page/GoogleMaphotel';
import SimilarCart from '../../page/SimilarCart';

import BookingOfRoom from '../../page/BookingOfRoom';

const HotelBook = () => {

    const {hotelId} = useParams();
    const {token} = useSelector((state)=> state.auths)
    const [Ratings,setRating] = useState("0")

    const gettsingleHotel = async () => {
        try {
            const responce = await singlehotel(hotelId,token);
            console.log("Responce OF Hotels", responce)
            return responce
        } catch (error) {
            console.log("Error For Getting Of Hotels", error)
        }
    }

    useEffect(()=>{
        async function ratings(){
            const result = await avrageRating(hotelId);
            if(result){
                setRating(result)
            }
        }
        ratings();
    },[])

    const {isLoading,data:visiters} = useQuery({queryKey:["hotelInfo"],queryFn:gettsingleHotel},{
        staleTime: 120000,
      })

    if (isLoading){
         return <h1>Loading...</h1>
    }

    if (token === null){
        return <Login/>
    }
  return (
    <div>
        <div className='flex w-11/12 h-[500px] overflow-hidden mx-auto mt-2 shadow-lg rounded-md' >
        <Swiper spaceBetween={30}
        effect={'fade'}
        navigation={true}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper">
                    {
                        visiters?.hostel_image?.map((imgs,index)=>(
                            <SwiperSlide key={index}>
                                <img src={imgs} alt='msdfndkjn' className='overflow-hidden'/>
                            </SwiperSlide>
                        ))
                    }
            </Swiper>
            
        </div>
        <div className='w-11/12 mx-auto flex flex-col'>
            <div className='flex items-center justify-center w-fit gap-x-5 p-2'>
               <h1 className='text-4xl font-bold mt-5 '>{visiters?.hostelName}</h1>
            </div>
            <div className='flex flex-col p-2 gap-y-4'>
                <h1 className=' font-bold text-xl underline underline-offset-8 decoration-4 decoration-yellow-300'>History</h1>
                <span className=' text-lg px-2 '>{visiters?.Description}</span>
            </div>
            <div className='flex flex-col p-2 gap-y-5'>
                <h1 className=' font-bold text-xl underline underline-offset-8 decoration-4 decoration-yellow-300'>Amenities</h1>
                <span className='flex gap-x-2'>{visiters?.Facilities?.map((Facilities,index)=>(<p key={index} className='px-5 flex border-2 font-bold capitalize w-fit rounded-full text-zinc-700 py-1.5 hover:bg-fuchsia-700 hover:text-zinc-100 cursor-pointer transition-all duration-75 ease-in-out'>{Facilities}</p>))}</span>
            </div>
            <div className='flex flex-col p-2 gap-y-4'>
                <h1 className=' font-bold text-xl underline underline-offset-8 decoration-4 decoration-yellow-300'>Booking OF Rooms</h1>
                <BookingOfRoom BookingInfo={visiters} hotelId={hotelId} token={token} />
            </div>
            <div className='flex flex-col p-2 gap-y-4'>
                <h1 className=' font-bold text-xl underline underline-offset-8 decoration-4 decoration-yellow-300'>Positive Reviews OF Customer</h1>
                <CustomerView  RatingOfRange={Ratings} hotelId={hotelId}/>
            </div>
           
            <div className='flex flex-col p-2 gap-y-4'>
                <h1 className=' font-bold text-xl underline underline-offset-8 decoration-4 decoration-yellow-300'>Location Of HOTEL</h1>
                <GoogleMaphotel googleLocation={visiters}/>
            </div>
            <div className='flex flex-col p-2 gap-y-4'>
                <h1 className=' font-bold text-xl underline underline-offset-8 decoration-4 decoration-yellow-300'>Similar Properties Of Location Hotel</h1>    
                <SimilarCart location={visiters?.place_location}/>
            </div>
            
        </div>
    </div>
  )
}

export default HotelBook