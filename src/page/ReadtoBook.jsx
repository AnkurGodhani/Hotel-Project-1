import React from 'react'
import see from '../images/hotelsOfseen.jpg'
const ReadtoBook = () => {
  return (
    <div className=' relative'>
        <div className=' bg-scroll bgimage h-[600px] -z-50 hover:grayscale'></div>
            <div className='absolute flex flex-col gap-y-2 mx-auto z-[9999] text-white text-center top-48' data-aos="zoom-in">
                    <h3 className='text-4xl font-semibold'>ARE YOU READY TO TRAVEL?</h3>
                    <h3 className='text-4xl font-semibold'>REMEMBER US !!</h3>
                    <p className='w-[50%] mx-auto opacity-99 font-semibold'>Whether you're driving along the Road to Hana, enjoying a bird's-eye view of Maui's lush coastline from a helicopter, snorkeling with sea turtles or simply relaxing on white or black sand beaches, you'll find that this Hawaiian island is unlike any other tropical destination.</p>
                    <div className='flex gap-x-8 items-center justify-center mt-8'>
                        <button className='px-16 py-4 uppercase bg-sky-600 font-semibold rounded-md hover:bg-white hover:border-sky-600 hover:text-sky-600 transition-colors duration-200 ease-linear'>view Packages</button>
                        <button className='px-16 py-4 font-semibold bg-white text-sky-600 uppercase rounded-md hover:bg-sky-600 hover:border-sky-600 hover:text-white transition-colors duration-200 ease-linear'>learn more</button>
                    </div>
        </div>
    </div>
  )
}

export default ReadtoBook