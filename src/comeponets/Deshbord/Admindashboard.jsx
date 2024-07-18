import React from 'react'
import { RiHotelFill } from "react-icons/ri";
import { SiHiltonhotelsandresorts } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";

const Admindashboard = () => {
  return (
   
     <div className='flex flex-col'>

<div className='flex gap-x-36 mt-24 ml-[290px] '>
        <div className='flex border w-fit p-5 bg-blue-300'>
            <div className='flex justify-between items-center gap-x-12 '>
                 <div >
                     <RiHotelFill size={50} />
                 </div>
                 <div className='flex flex-col items-end'>
                    <p className='text-5xl'>3</p>
                    <p className='text-2xl'>Total Hotels</p>
                 </div>
            </div>
            
      </div>
      <div className='flex border w-fit p-5 bg-green-500'>
            <div className='flex justify-between items-center gap-x-12 '>
                 <div>
                 <SiHiltonhotelsandresorts size={50} floodColor={20}/>
                 </div>
                 <div className='flex flex-col items-end'>
                    <p className='text-5xl'>3</p>
                    <p className='text-2xl'>Available Hotels</p>
                 </div>
            </div>
      </div>
      <div className='flex border w-fit p-5 bg-orange-300'>
            <div className='flex justify-between items-center gap-x-12 '>
                 <div>
                 <FcBusinessman size={50} />
                 </div>
                 <div className='flex flex-col items-end'>
                    <p className=' text-5xl'>3</p>
                    <p className='text-2xl'> <a href="/Ownerdetails">Owner Details </a></p>
                 </div>
            </div>
      </div>
     </div>
        <div className='flex justify-center items-center mt-5 p-5'>
         
        </div>
     </div>
      

    

  )
}

export default Admindashboard