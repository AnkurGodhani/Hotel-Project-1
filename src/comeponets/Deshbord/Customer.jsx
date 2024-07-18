import React, { useState } from 'react'
import { getallbookings } from '../../service/opretions/hotelIn';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import AdminEditBookRoom from '../../models/AdminEditBookRoom';
import { MdEdit } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

const Customer = () => {
    const {token} = useSelector((state)=>state.auths)
    const datas = async() =>{
        const result = await getallbookings(token);
        return result
    }
    const {isLoading,data} = useQuery({queryKey:['book'],queryFn:datas ,staleTime:150000})

    const [search,setsearch] = useState('')

    const [edit,setedit] = useState(false)
  return (
    <div className="flex flex-col gap-y-5 container mx-auto p-4">
        <div className='w-full flex justify-end items-end'>
            <form className='w-full'>
                <input type="search" onChange={(e)=>setsearch(e.target.value)} placeholder='Enter a Emailid' className='px-5 py-2 rounded-md  border-2 w-full outline-none'/>
            </form>
        </div>
        <div className='flex items-end justify-end'>
        {
            !edit ?  
            <button type='button' onClick={()=>setedit(true)} className='flex items-center gap-x-2 border-2 px-4 py-1.5 rounded-md bg-green-800 text-white font-bold uppercase '>Edit<MdEdit/></button>  :   <button type='button' onClick={()=>setedit(false)} className='flex items-center gap-x-2 border-2 px-4 py-1.5 rounded-md bg-red-800 text-white font-bold uppercase'>Remove<CiCircleRemove/></button>
        }                   
        </div>
       
        <table className="min-w-full  bg-white border border-gray-300">
            <thead>
                <tr className='border-2'>
                    <th className="py-2 px-4 border-2">ID#</th>
                    <th className="py-2 px-4 border-2"> Name</th>
                    <th className="py-2 px-4 border-2">Hotel</th>
                    <th className="py-2 px-4 border-2">Location</th>
                    <th className="py-2 px-4 border-2">Email Address</th>
                    <th className="py-2 px-4 border-2">Booking Date</th>
                    <th className="py-2 px-4 border-2">Expire Date</th>
                    <th className="py-2 px-4 border-2">Stauts</th>
                    
                </tr>
            </thead>
            <thead >
                {
                    data?.filter((items)=>{
                        return search.toLowerCase() === '' ? items : items?.email?.toLowerCase().includes(search)
                    }).map((book,index)=>(
                       
                        <tr className='border-2'>
                          
                                <td className='text-center p-2 border-2'>{index + 1}</td>
                                <td className='text-center p-2 border-2'>
                                   {book?.Name}
                                </td>
                                <td className='text-center p-2 border-2'>{book?.hotelId?.hostelName}</td>
                                <td className='text-center p-2 border-2'>{book?.hotelId?.place_location}</td>
                                <td className='text-center p-2 border-2'>{book?.email}</td>
                                <td className='text-center p-2 border-2'>{book?.start_Room_Book_Date.slice(0,10)}</td>
                                <td className='text-center p-2 border-2'>{book?.End_Room_Book_Date.slice(0,10)}</td>
                                <td className='text-center p-2 border-2 text-green-700 font-bold'>success</td>
                                
                                {
                                   edit && <td className='text-center p-2 border-2'><AdminEditBookRoom editData={book} id={book._id}/></td>
                                }
                        </tr>
                    ))
                }
            </thead>
        </table>
       
    </div>
  )
}

export default Customer