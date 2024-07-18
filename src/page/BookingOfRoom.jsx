
import React, { useEffect, useState } from 'react'
import { FaFileImage } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { booking } from '../service/opretions/paymetofhotel';
import { useForm } from 'react-hook-form';
import { RoomBook } from '../service/opretions/hotelIn';
import { useDropzone } from 'react-dropzone';
import { useRef } from 'react';

const BookingOfRoom = ({BookingInfo,hotelId,token}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectFile,setselectFile] = useState(null)
    console.log("select of image",selectFile)
    const inputRef = useRef(null)

    const {
        register,
        handleSubmit,
        setValue} = useForm();

    const onDrop = (acceptedFiles) =>{
        const file = acceptedFiles[0]
        if(file){
            setselectFile(file)
        }
    }

    const { getRootProps,getInputProps,isDragActive} = useDropzone({
        accept : {"image/*":[".jpeg",".jpg",".png"]},
        onDrop,
    })

    useEffect(()=>{
        setValue("identite",selectFile)
    },[selectFile,setValue])


    const handleonBook = async(data) =>{
        const bookData = new FormData();
        bookData.append("Name",data.Name)
        bookData.append("contact_no",data.contact_no)
        bookData.append("email",data.email)
        bookData.append("Number_of_room",data.Number_of_room)
        bookData.append("age",data.age)
        bookData.append("start_Room_Book_Date",data.start_Room_Book_Date)
        bookData.append("End_Room_Book_Date",data.End_Room_Book_Date)
        bookData.append("sex",data.sex)
        bookData.append("NumberOfMember",data.NumberOfMember)
        bookData.append("selectRoomNo",data.selectRoomNo)
        bookData.append("hotelId",hotelId)
        bookData.append("identite",data.identite)
        await booking(bookData,hotelId,data,token,navigate)
        //    dispatch(RoomBook(bookData,token,navigate))
    }

  return (
    <div className='flex justify-between items-start mx-auto w-full p-10 gap-x-20'>
        <div className=' max-w-[650px] flex rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(handleonBook)} className='flex flex-col justify-center items-start w-full gap-y-5 p-10'>
                 <label className='flex flex-col w-full'>
                     <p className=' text-md font-bold text-gray-800 '>Name</p>
                     <input type="text" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("Name",{required:true})}/>
                 </label>
                <div className='flex w-full gap-x-10'>
                <label className='flex flex-col w-full'>
                     <p className=' text-md font-bold text-gray-800 '>Phone-Number</p>
                     <input type="tel" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("contact_no",{required:true})}/>
                 </label>
                 <label className='flex flex-col w-full'>
                     <p className=' text-md font-bold text-gray-800 '>Email</p>
                     <input type="tel" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("email",{required:true})}/>
                 </label>
                </div>
                 <div className='flex w-full gap-x-10'>
                    <label className='flex flex-col w-full'>
                        <p className=' text-md font-bold text-gray-800 '>start-Date</p>
                        <input type="date" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("start_Room_Book_Date",{required:true})}/>
                    </label>
                    <label className='flex flex-col w-full'>
                        <p className=' text-md font-bold text-gray-800'>end-Date</p>
                        <input type="date" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("End_Room_Book_Date",{required:true})}/>
            
                    </label>
                 </div>
                 <div className='flex w-full gap-x-10'>
                 <label className='flex flex-col w-full'>
                     <p  className=' text-md font-bold text-gray-800 '>Gender</p>
                     <select className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("sex",{required:true})} >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                      </select>
                 </label>
                 <label className='flex flex-col w-full'>
                      <p className=' text-md font-bold text-gray-800 '>totalRoom-Requied</p>
                      <input type="tel"  className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("Number_of_room",{required:true})}/>
                 </label>
                 </div>
                 <div className='flex w-full gap-x-10'>
                 <label className='flex flex-col w-full'>
                      <p className=' text-md font-bold text-gray-800 '>Members</p>
                      <select className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("NumberOfMember",{required:true})} >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                      </select>
                 </label>
                 <label className='flex flex-col w-full'>
                      <p className=' text-md font-bold text-gray-800 '>age</p>
                      <input type="number" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("age",{required:true})}/>
                 </label>
                 </div>
                 <div {...getRootProps()} className='flex flex-col'>
                    <label className=' text-md font-bold text-gray-800 '>identite:Adharcart/passport/</label>
                <input {...getInputProps()} ref={inputRef} id='identite' 
                />
                <div className=' w-[545px] h-[260px] border-2 rounded-lg overflow-hidden mt-2'>
                     {
                         selectFile ? <img src={URL.createObjectURL(selectFile)} alt='5456465'/> : <div className='flex flex-col justify-center items-center mt-20 gap-y-2 font-bold'><FaFileImage size={35}/><p className='text-xs'>imge file spoort in jpg/jpeg/png</p></div>
                     }
                </div>
            </div>
                <label>
                    <p className=' text-md font-bold text-gray-800 '>Select Room</p>
                    <input type="tel" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("selectRoomNo",{required:true})}/>
                         <details className=' mt-2'>
                             <summary className='font-bold text-md text-sky-600'>Booking Room View</summary>
                                <p  className='mt-2 text-md font-bold text-gray-800 '>Booked Rooms:</p>
                                <div className=' grid grid-cols-10 place-items-center w-full gap-x-5 m-2'>

                                    {
                                        BookingInfo?.reservation_Room?.length > 0 ?
                                        BookingInfo?.reservation_Room?.map((value,index)=>(
                                            <div key={index} className='flex '>
                                                <div className={`flex w-10 h-10 rounded-full border items-center justify-center`}>{value}</div>
                                            </div>
                                        )) : (<span className='flex w-[145px] mx-auto items-center justify-center'>No BOOKING</span>)
                                    }
                                </div>
                                <p className=' text-md font-bold text-gray-800 '>total Rooms:</p>
                                <div className=' grid grid-cols-10 place-items-center gap-x-5 gap-y-3 mt-5'>
                                    {
                                        BookingInfo?.totalRoom?.map((value,index)=>(
                                            <div key={index} className='flex '>
                                                <div className={`flex w-10 h-10 rounded-full border items-center justify-center`}>{value}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                         </details>
                    </label>
                    <button className=' mx-auto p-2 bg-blue-800 w-full rounded-md text-white font-semibold' type='submit'>PAYMENT NOW</button>
            </form>
        </div>
        <div className='shadow-lg p-5 '>
             <div className='flex flex-col mx-auto justify-start items-start gap-y-5'>
                 <h1 className='text-3xl mx-auto '>Your Booking Information</h1>
                 <p className=''>totalRoom:2</p>
                <span className='flex items-center gap-x-5 text-lg'><p><FaRupeeSign size={35}/></p>{BookingInfo?.Price * 3}/-</span>
                 <span>Members:2</span>
                 <span className='text-red-700 font-bold w-[100%]'>Note:Cancellation and prepayment policies vary according to accommodation type. Please enter the dates of your stay and check the conditions of your required room.</span>
             </div>
        </div>
    </div>
  )
}

export default BookingOfRoom