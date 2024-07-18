import { Rating } from '@mui/material'
import React, { useState } from 'react'

import {Avatar , LinearProgress} from '@mui/material'
// import ProgressBar from "@ramonak/react-progress-bar";
import { red } from '@mui/material/colors';
import RatingAndReview from '../models/RatingAndReview';



const CustomerView = ({RatingOfRange,hotelId}) => {
    const [RatingModal,setRatingModal] = useState(false)
  return (
    <div className='flex items-center justify-center  mx-auto w-full'>
        <div className='flex justify-between items-start mt-5 gap-x-24'>
            <div className='flex flex-col ml-5 gap-y-2 mt-8'>
                <h1 className='text-2xl font-bold text-gray-900 '>Customer Reviews</h1>
                <div className='flex gap-x-3 items-center'>
                    <Rating value={parseInt(RatingOfRange?.finalRating)} size='normal' readOnly />
                     <span className=' text-gray-800 font-semibold text-lg'>Based on {RatingOfRange?.responces?.RatingandReview?.length} reviews</span>
                </div>
                <div className='flex flex-col gap-y-2 m-4'>
                        
                        <span className='flex items-center font-bold text-lg gap-x-2 '>5<Rating defaultValue={1} max={1} /><LinearProgress variant="determinate" value={RatingOfRange?.star5} className='w-full' />{RatingOfRange?.star5}%</span>

                        <span className='flex items-center font-bold text-lg gap-x-2'>4<Rating defaultValue={1} max={1} /><LinearProgress variant="determinate" value={RatingOfRange?.star4} className='w-full' />{RatingOfRange?.star4}%</span>
                        
                        <span className='flex items-center font-bold text-lg gap-x-2'>3<Rating defaultValue={1} max={1} /><LinearProgress variant="determinate" value={RatingOfRange?.star3} className='w-full' />{RatingOfRange?.star3}%</span>
                        
                        <span className='flex items-center font-bold text-lg gap-x-2'>2<Rating defaultValue={1} max={1} /><LinearProgress variant="determinate" value={RatingOfRange?.star2} className='w-full' />{RatingOfRange?.star2}%</span>
                        
                        <span className='flex items-center font-bold text-lg gap-x-2'>1<Rating defaultValue={1} max={1} /><LinearProgress variant="determinate" value={RatingOfRange?.star1} className='w-full' />{RatingOfRange?.star1}%</span>
                        
        
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-xl font-semibold'>Share your thoughts</p>
                    <span className=' text-gray-800 opacity-95'>If you’ve used this product, share your thoughts with other customers</span>
                    <button type="button" className=' border p-1.5 mt-5 font-semibold rounded-md hover:bg-gray-50 transition-all duration-100 ease-linear' onClick={()=>setRatingModal(true)} >
                        Write a review
                    </button>
                </div>
                {
                    RatingModal && <RatingAndReview setmodal={setRatingModal} hotelId={hotelId} />
                }
            </div>
            {/* Review OF Next Part  */}
           <div className='w-[50%] mr-10'>
                {
                    RatingOfRange?.responces?.RatingandReview?.map((vsitr)=>(
                        <div className=' border-b-2 pb-8 pt-8'>
                        <div className='flex flex-col gap-y-5 w-fit'>
                            <div className='flex gap-x-5 items-center justify-start'>
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {vsitr?.user?.Name.slice(0,1)}
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className=' font-bold'>{vsitr?.user?.Name}</span>
                                    <Rating value={parseInt(vsitr?.Rating)} size='small' readOnly />
                                </div>
                            </div>
                            <div className=' text-lg font-normal italic text-gray-700 opacity-90'>
                                {vsitr?.Review}
                            </div>
                        </div>
                    </div>
                    ))
                }
           </div>
        </div>
    </div>
  )
}

export default CustomerView