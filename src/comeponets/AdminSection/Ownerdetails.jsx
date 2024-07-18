import React from 'react'

const Ownerdetails = () => {
  return (
    <div className='flex flex-col justify-center items-center '>
        <h1 className='flex mt-6 font-bold font-sans text-4xl'>Hotel Owners</h1>
        <div className='flex mt-10 border-1.5 h-48 w-[800px]  shadow-lg hover:shadow-indigo-500/40'>
            <div className='flex flex-col mt-4 ml-10'>
            <h2 className='text-xl font-bold mb-2'>Hotel ABC</h2>
            <div className='flex flex-col gap-y-2'>
            <p><span className='font-semibold'>Owner Name:</span> Ankur</p>
            <p><span className='font-semibold'>E-mail:</span> Ankur@gmail.com</p>
            <p><span className='font-semibold'>Phone:</span> 9568741236</p>
            </div>
            </div>
            <div>
            <div className='flex flex-col justify-center ml-[300px] mt-14 gap-y-2'>
            <p><span className='font-semibold'>Address:</span>123 Main St, City, Country</p>
            <p><span className='font-semibold'>Website:</span> <a href="#" class="text-blue-500"> google.com</a></p>
            </div>
            </div>

        </div>
    </div>
  )
}

export default Ownerdetails