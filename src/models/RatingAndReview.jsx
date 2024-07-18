import { Avatar, Rating } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { deepOrange } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { RatingOfUser } from '../service/opretions/Rating_Reviews';
import Box from '@mui/material/Box';
import { GiCrossMark } from "react-icons/gi";




const RatingAndReview = ({setmodal,hotelId}) => {
   const {token,user} = useSelector((state)=>state.auths)
   const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState:{errors}
    } = useForm();

    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);

    const onhandleRating = (data) =>{
        const formData = new FormData();
        formData.append("Rating",value)
        formData.append("Review",data.Review)
        formData.append("hotels",hotelId)

        console.log("Raating of Customer",formData)
        dispatch(RatingOfUser(formData,token))
    }
  return (
    <div className='absolute flex flex-col bg-gray-100 w-[545px] rounded-md shadow-xl z-[99] left-[32%] right-0' >
        <button onClick={(pre)=>setmodal(!pre)} className='flex flex-row-reverse px-4 py-4'><GiCrossMark size={25} className='hover:opacity-65'/></button>
         <form onSubmit={handleSubmit(onhandleRating)} className='w-full  flex flex-col mx-auto justify-center items-center gap-y-2'>
            <div className='flex w-full items-center px-10 gap-x-3'>
                <Avatar  sx={{ width: 50, height: 50 ,bgcolor: deepOrange[500] }}>{user.Name.slice(0,1)}</Avatar>
                <div className='flex flex-col justify-center'>
                        <p className='font-bold'>{user.Name}</p>
                        <span className='text-xs'>{ Date().slice(0,15)}</span>
                </div>
            </div>
     
            <Box
    >
      <Rating
        name="hover-feedback"
        size='large'
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      
    </Box>
      
            <div>
               <textarea  cols={60} rows={5} className='border-2 hover:border-blue-600 p-2 resize-none rounded-md' {...register("Review",{required:true})} />
            </div>
            <button type="submit" className=' bg-yellow-500 mb-2 py-2 px-8 rounded-md mx-auto  text-yellow-50 font-bold '>Post</button>
         </form>
        </div>
  )
}

export default RatingAndReview