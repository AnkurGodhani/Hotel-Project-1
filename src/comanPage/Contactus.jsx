import React from 'react'
import Footer from './Footer'

const Contactus = () => {
  return (
    <div className='overflow-hidden max-h-fit'>
        <main className="contect ">
    <h1 className="  relative flex flex-col justify-center items-end mr-[20%] top-[14%] text-3xl text-yellow-500 font-extrabold">Contact Us</h1>
    <form action="/contact" method="post" className=" relative flex flex-col justify-center  gap-y-2 top-[17%] items-start float-end mr-[10%]">
        <label htmlFor="name" className="text-yellow-500 font-sans font-bold">Name:</label>
        <div className="flex gap-x-6 opacity-80">
        <input type="text" id="name" name="name" required placeholder="First Name" className="rounded-lg p-2"/>
        <input type="text" id="name" name="name" required placeholder="Last Name" className="rounded-lg p-2"/>
        </div>
        <label htmlFor="Email:" className="text-yellow-500 font-sans font-bold">Email:</label>
        <input type="text" id="email" name="email" required className="w-full flex gap-x-6 opacity-80 rounded-lg p-2"/>

        <label htmlFor="number" className="text-yellow-500 font-sans font-bold">Phone No:</label>
        <input type="tel" id='phone'  name="phone"  maxlength="10" className="w-full flex gap-x-6 opacity-80 rounded-lg p-2"/>

        <label htmlFor="message" className="text-yellow-500  font-sans font-bold mt-2">Address:</label>
        <textarea id="message" name="message" required className="w-full resize-none flex gap-x-6 opacity-80 rounded-lg p-2"/>
        
        <label htmlFor="message" className="text-yellow-500 font-sans  font-bold mt-3">Message:</label>
        <textarea id="message" name="message" required className="w-full resize-none flex gap-x-6 opacity-80 rounded-lg p-2"/>

        <button type="submit" className="bg-green-600 shadow-lg shadow-cyan-500/100  text-white hover:opacity-65 transition-all duration-200 ease-linear py-2 px-3 mt-2  rounded-lg font-sans font-bold mx-auto">submit</button>

    </form>

    </main>
    <Footer />
    </div>
  )
}

export default Contactus