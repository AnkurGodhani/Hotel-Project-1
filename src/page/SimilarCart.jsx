import React , {useState} from 'react'
import { Chip, Rating } from '@mui/material';
import { useQuery } from 'react-query'
import { gethotel } from '../service/opretions/hotelIn';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const SimilarCart = ({location}) => {
    console.log("location",location)
    const gethotels = async () => {
        try {
            const responce = await gethotel();
            console.log("Responce OF Hotels", responce)
            return responce
        } catch (error) {
            console.log("Error For Getting Of Hotels", error)
        }
    }
    const { isLoading, data: hotel } = useQuery({ queryKey: ["hotels"], queryFn: gethotels }, {
        staleTime: 120000,
      })

      //silder is code
      const [display, setDisplay] = useState(true);
      const [width, setWidth] = useState(1380);
    
      const settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
  return (
    <div className='mt-2'>
        <div  style={{
          width: width + "px",
          display: display ? "block" : "none"
        }} className='flex justify-center items-center'>
        <Slider {...settings} className=' flex justify-center items-center w-full mb-5'>
         {
            hotel?.map((similar)=>(
               similar.place_location == location && (
                 <div className='flex justify-center items-center max-w-[450px] h-[560px]  border-2 border-blue-600 rounded-md'>
                     <div className=' h-[220px] overflow-hidden rounded-md'>
                            { 
                                <img src={similar?.hostel_image[0]} className=' bg-cover object-cover' />
                            }
                     </div>
                     <h1 className=' text-gray-700 font-bold text-2xl mt-2 p-2 text-center hover:text-gray-500 transition-colors duration-100 ease-linear'>{similar?.hostelName}</h1>

                     <p className='text-sm text-center p-2 '>{similar?.Description?.slice(0,50)}</p>
                     <div className='flex justify-between items-center gap-x-2 p-2'>
                        <span className='text-gray-800 font-bold'>contact Number: +91 {similar?.contact_no}</span>
                        <span className='text-gray-800 font-bold'>RoomBook: {similar?.reservation_Room.length == 0 ? <span className='text-red-800 font-bold'>Full</span> : similar?.reservation_Room.length }</span>
                     </div>
                     <div className='p-2'>
                        {
                            similar?.Facilities?.map((chip)=>(
                                <Chip label={chip} className='mx-2 my-2' />
                            ))
                        }
                     </div>
                     <button type='button' className='flex mx-auto mt-2 py-3 px-4 bg-gray-800 rounded-lg text-gray-500 items-center justify-center hover:text-white font-bold'>CHECK MORE INFROMATION</button>
                 </div>
               )
            ))
         }
         </Slider>
        </div>
    </div>
  )
}

export default SimilarCart