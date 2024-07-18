import React from 'react'



const Bookingsidebar = () => {
  return (
    <div className=' relative top-[100px]'>
        <div className=' max-w-[250px] border-2 max-h-[100vh]'>
            <h1>Filter by:</h1>
            <form className=' grid grid-cols-1'>
                <h1>Popular filters</h1>
                <section>
                    <input type="checkbox" id="5 stars" value={5}/>
                    <label htmlFor="stars">5 stars</label>
                </section>
            </form>
        </div>
    </div>
  )
}

export default Bookingsidebar