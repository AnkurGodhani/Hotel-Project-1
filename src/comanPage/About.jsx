import React from 'react'

import Footer from './Footer'

export const About = () => {
  return (
    <div className='overflow-hidden flex flex-col'>
     
    <main className="home">
     <div className=" relative flex flex-col justify-center  top-[100px] gap-y-4 items-center">
       <h1 className=" flex flex-col justify-center items-center  text-white font-bold font-serif">About Us</h1>
       <h1 className="w-[60%] text-white ">At [Hotel Name], we pride ourselves on offering exceptional hospitality in [City/Location]. Our hotel is renowned for its [mention any unique features such as breathtaking views, historical significance, etc.]. Our commitment to service excellence and guest satisfaction sets us apart, making us the preferred choice for travelers seeking both luxury and convenience.</h1>
       <h1 className="text-white opacity-90 underline"> Our Accommodations</h1>
       <h1 className="w-[60%] text-white ">Discover our range of meticulously designed rooms and suites, each offering a blend of contemporary elegance and comfort. Whether you choose a cozy standard room or an expansive suite with panoramic views, every accommodation is equipped with modern amenities to ensure a relaxing stay. Enjoy plush bedding, spacious bathrooms, complimentary Wi-Fi, and more.</h1>
       <h1 className="text-white opacity-90 underline">Dining Experience</h1>
       <h1 className="w-[60%] text-white ">Including a culinary delights at our [Hotel Restaurant Name], where our talented chefs create dishes that tantalize the taste buds. From gourmet breakfast buffets to delectable dinner options, our restaurant promises a dining experience like no other. Unwind with a refreshing drink at our stylish bar, perfect for relaxing after a day of exploration.</h1>
       
     </div>
     
 </main>
 
        <Footer/>
    </div>
  )
}

export default About