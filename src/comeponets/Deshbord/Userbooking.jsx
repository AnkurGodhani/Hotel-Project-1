import React from 'react';
import { useQuery } from 'react-query';
import { adminPaymentdetail } from '../../service/opretions/paymetofhotel';
import { useSelector } from 'react-redux';
import { IoIosInformationCircleOutline } from "react-icons/io";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const Userbooking = () => {
        
       const {token} = useSelector((state)=>state.auths)

       const Paymentdetail = async()=>{
            const result = await adminPaymentdetail(token)
            console.log("results",result)
            return result
       }
        const {data:payment} = useQuery({queryKey:['py'],queryFn:Paymentdetail,staleTime:150000})
    return (
        <div className='w-full p-2 mx-auto'>
           
                <section>
                    <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                        <table className="border-collapse w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">userId</th>
                                    <th className="border border-gray-300 px-4 py-2">order_id</th>
                                    <th className="border border-gray-300 px-4 py-2">BookingId</th>
                                    <th className="border border-gray-300 px-4 py-2">hotelName</th>
                                    <th className="border border-gray-300 px-4 py-2">amount</th>
                                    <th className="border border-gray-300 px-4 py-2">PhoneNo</th>
                                    <th className="border border-gray-300 px-4 py-2">status</th>
                                </tr>
                            </thead>
                            <thead>
                                
                                     {
                                         payment?.map((py,index)=>(
                                            <tr key={index}>
                                               <td className='p-2 text-center border-2'>{py.userid.Name}<Tooltip placement="right" title={
                                                  <div className='flex flex-col'>
                                                        <p>id: {py.userid?._id}</p>
                                                         <span>PhoneNo: <a  className=" underline"href={`tel:${py.userid?.contact_no}`}>{py.userid?.contact_no}</a></span>
                                                         <span>Email: {py.userid?.email}</span>
                                                  </div>
                                               }>
                                                    <IconButton>
                                                       <IoIosInformationCircleOutline size={15}/>
                                                    </IconButton>
                                                    </Tooltip></td>
                                               <td className='p-2 text-center border-2'>{py.order_Id}</td>
                                               <td className='p-2 text-center border-2'>{py.BookingId?._id}<Tooltip placement="right" title={
                                                  <div className='flex flex-col gap-y-1 p-2'>
                                                        <p>Name: {py.BookingId?.Name}</p>
                                                         <span>PhoneNo: <a  className="underline" href={`tel:${py.BookingId?.contact_no}`}>{py.BookingId?.contact_no}</a></span>
                                                         <span>Email: {py.BookingId?.email}</span>
                                                         <span>check-in: {py?.BookingId?.start_Room_Book_Date.slice(0,10)
                                                         }</span>
                                                         <span>check-out: {py.BookingId?.End_Room_Book_Date.slice(0,10)
                                                         }</span>
                                                         <div  className='flex justify-between  gap-x-5'>
                                                            <span>NumberOfMember: {py.BookingId?.NumberOfMember
                                                            }</span>
                                                            <span>Booking of Rooms: {py.BookingId?.Number_of_room}</span>
                                                         </div>
                                                         <div className='flex justify-between  gap-x-5'>
                                                            <span>Age: {py.BookingId?.age}</span>
                                                            <span>sex: {py.BookingId?.sex}</span>
                                                         </div>
                                                  </div>
                                               }>
                                                    <IconButton>
                                                       <IoIosInformationCircleOutline size={15}/>
                                                    </IconButton>
                                                    </Tooltip></td>
                                                    <td className='p-2 text-center border-2'>{py.hotelId?.hostelName}<Tooltip placement="right" title={
                                                  <div className='flex flex-col gap-y-0.5 p-2'>
                                                        <p>id: {py.hotelId?._id}</p>
                                                         <span>PhoneNo: <a  className="underline" href={`tel:${py.hotelId?.contact_no}`}>{py.hotelId?.contact_no}</a></span>
                                                         <span>Email: {py.hotelId?.email}</span>
                                                         <span>Text_and_charges:{py.hotelId?.Text_and_charges[0]}</span>
                                                         <span>Price: {py.hotelId?.Price}</span>
                                                        <span>place_location: {py.hotelId?.place_location}</span>
                                                        <span>ownderName: {py.hotelId?.ownderName}</span>
                                                  </div>
                                               }>
                                                    <IconButton>
                                                       <IoIosInformationCircleOutline size={15}/>
                                                    </IconButton>
                                                    </Tooltip></td>
                                               <td className='p-2 text-center border-2'>{py.amount}</td>
                                               <td className='p-2 text-center border-2'>{py.userid?.contact_no}</td>
                                               <td className='p-2 text-center border-2 text-green-800 font-semibold'>{py.statusof}</td>
                                            </tr>
                                         ))
                                     }
                                
                            </thead>
                        </table>
                    </div>
                </section>
        </div>
    );
};

export default Userbooking;
