import React from 'react'
import { useQuery } from 'react-query'
import { gethotel } from '../../service/opretions/hotelIn'

const Rooms = () => {
     const alldata = async() =>{
        const result = await gethotel();
        return result
     }
     const {isLoading,data} = useQuery({queryKey:['admindata'],queryFn:alldata})
  return (
    <div class="container  p-4">
    <table class=" min-w-full  bg-white border border-gray-300">
        <thead>
            <tr className=' bg-gray-700 text-white'>
                <th class="py-2 px-4 border-2 border-gray-500">No.</th>
                <th class="py-2 px-4 border-2 border-gray-500">Hotel Name</th>
                <th class="py-2 px-4 border-2 border-gray-500">Location</th>
                <th class="py-2 px-4 border-2 border-gray-500">Total Rooms</th>
                <th class="py-2 px-4 border-2 border-gray-500">Booked Room</th>
                <th class="py-2 px-4 border-2 border-gray-500">Empty Room</th>
            </tr>
          </thead>
        
            <thead>
                {
                   data?.map((admindata ,index)=>(
                    <tr key={index} className=' border-2 odd:bg-gray-200 even:bg-blue-200'>
                     <th class="py-2 px-4 border-b font-semibold border-2 text-yellow-800">{index + 1}</th>
                     <th class="py-2 px-4 border-b font-semibold text-slate-500">{admindata.hostelName}</th>
                     <th class="py-2 px-4 border-b font-semibold border-2 text-yellow-700">{admindata.place_location}</th>
                     <th class="py-2 px-4 border-b font-semibold text-2xl text-blue-500 border-2">{admindata.totalRoom.length}</th>
                     <th class="py-2 px-4 border-b font-semibold text-2xl text-red-500 border-2">{admindata.reservation_Room.length}</th>
                     <th class="py-2 px-4 border-b font-semibold text-2xl text-green-500 border-2">{admindata.totalRoom.length - admindata.reservation_Room.length}</th></tr>
                   ))
                }
            </thead>
    </table>
</div>
  )
}

export default Rooms