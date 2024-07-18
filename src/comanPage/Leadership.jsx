import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Ankur from "../images/Ankur.jpg"
import nikunj from "../images/nikunj.jpg"
import meet from "../images/meet.jpg"
const Leadership = () => {
  return (
    <div className='bg-[#f5f4ff] w-full mt-5 p-5' >
        <div className='flex flex-col justify-center mx-auto text-center w-full gap-y-5'>
            <div className='text-4xl text-gray-950 opacity-95 font-semibold'>Meet our leadership</div>
            <p className='w-[45%] text-center mx-auto text-xl text-gray-700 opacity-95'>We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
        </div>
        <div  className='w-10/12 flex flex-col justify-center p-5 mt-10 items-center mx-auto'>
            <div className=' grid grid-cols-1 gap-y-20'>
                <div className='flex  justify-center items-center gap-x-3 '  data-aos="zoom-in-up" ata-aos-duration="4000">
                    <div className='flex gap-x-2 justify-center items-center'>
                        <div className=' w-[230px] h-[260px] overflow-hidden rounded-2xl'><img src={Ankur} className='w-[490px] h-[260px] object-cover bg-cover'/></div>
                        <section className='flex flex-col gap-y-5 w-fit'>
                            <div className='flex flex-col ml-2'> 
                                <h1 className='text-lg font-semibold'>Ankur Godhani</h1>
                                <p className='text-gray-600'>MERN STACK Developer</p>
                            </div>
                            <div className='w-[50%] text-gray-600'>
                                <span>We are seeking a skilled and experienced MERN (MongoDB, Express.js, React, Node.js) Stack Developer to join our dynamic team. As a MERN Stack Developer, you will be responsible for designing, implementing, and maintaining full-stack applications.</span>
                            </div>
                        </section>
                    </div>
                </div>
                {/* 2  */}
                <div className=' relative  left-[340px] flex justify-center items-center  gap-x-3'  data-aos="zoom-in-up" ata-aos-duration="4000">
                    <div className='w-[230px] h-[260px] overflow-hidden rounded-2xl'><img src={nikunj} className='w-[590px] h-[260px] object-cover bg-cover'/></div>
                    <section className='flex flex-col gap-y-5 w-fit'>
                        <div className='flex flex-col ml-2'> 
                            <h1 className='text-lg font-semibold'>Nikunj Kodavala</h1>
                            <p className='text-gray-600'>React Developer</p>
                        </div>
                        <div className='w-[50%] text-gray-600 '>
                            <span>He approaches new challenges creatively, with a problem-solving mindset. He's particularly strong in React and has experience with hooks, functional, and class components. he has 1+ years of experience working in technology, as well as 1+ years...</span>
                        </div>
                    </section>
                </div>
                {/* 3  */}
                <div className=' relative left-[640px] flex  justify-center items-center  gap-x-3'  data-aos="zoom-in-up" ata-aos-duration="4000">
                    <div className='w-[230px] h-[260px] overflow-hidden rounded-2xl'><img src={meet} className='w-[590px] h-[260px] object-cover bg-cover'/></div>
                    <section className='flex flex-col gap-y-5 w-fit'>
                        <div className='flex flex-col ml-2'> 
                            <h1 className='text-lg font-semibold'>Meet Gohel</h1>
                            <p className='text-gray-600'>Node Developer</p>
                        </div>
                        <div className='w-[50%] text-gray-600 '>
                            <span>experienced software developer and tech lead, familiar with numerous languages and web technologies. He has more than nine years of professional experience writing JavaScript, seven working with React and Node.js, and over five years working with Elixir...</span>
                        </div>
                    </section>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default Leadership