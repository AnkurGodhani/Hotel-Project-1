import React from 'react'
import { useQuery } from 'react-query';
import { getuserbooking } from '../../service/opretions/hotelIn';
import { useSelector } from 'react-redux';
import { Chip } from '@mui/material';


const Bookings = () => {
    const {token} = useSelector((state)=>state.auths)
    const datas = async() =>{
        const result = await getuserbooking(token);
        return result
    }
    const {isLoading,data:pay} = useQuery({queryKey:['book'],queryFn:datas ,staleTime:150000})

    const date = new Date();
  return (
   <div class=" bg-white overflow-hidden">
   <div class="flex flex-col mx-auto container px-4 py-8">
       <h1 class=" flex justify-center items-center  text-3xl text-center font-bold">Booked Room Details</h1>
         {
            pay?.BookingRoom?.map((book)=>(
                <>
            <div class=" mt-8 p-6   border-2 border-black rounded-3xl w-[500px] mx-auto ">
                <h2 class="text-xl ml-[100px]"><span className=' font-bold'>Hotel Name:</span><span className='font-semibold font2'> {book?.hotelId?.hostelName}</span></h2>
                <p class="text-gray-700 mt-4 font-serif ml-10 text-lg ">A luxurious room with all modern amenities .</p>
                <div class=" mt-6 flex gap-x-24 ">
                    <p><strong>Check-in:</strong>{book?.start_Room_Book_Date.slice(0,10)}</p>
                    <p><strong>Check-out:</strong>{book?.End_Room_Book_Date.slice(0,10)}</p>
                    
                </div>
                <div className='flex justify-between mr-[110px]'>   
                    <p className='mt-3'><strong>Guests:</strong>{book?.NumberOfMember}</p>
                    <p className='mt-3'><strong>Room No:</strong>{
                         book?.selectRoomNo.map((room)=>(
                            <span>{room}</span>
                         ))
                    }</p>
                </div>     
                <div class="flex mt-5 ml-[150px] ">
                <span className='text-lg'><strong>Price:</strong></span> <span class=" mr-[500px] text-xl font-bold text-green-600">{book?.hotelId?.Price}</span>
                </div>
                <div>
                    {
                        book?.End_Room_Book_Date.slice(0,10) <= date.toJSON().slice(0,10) ? <Chip label="EXPIRE" sx={{bgcolor:"red",color:"white"}} /> : <Chip label="ACTIVE" sx={{bgcolor:"green",color:"white"}}></Chip>
                    }
                </div>
            </div>   
                </>
            ))
         }
        </div>
        
        </div>

    )
    }


export default Bookings;