import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileDropDown from '../comanPage/ProfileDropDown'

const Navbar = () => {
    const {token} = useSelector((state)=>state.auths)
  return (
    <div className=' fixed flex w-full z-[99] bg-white -mt-2'>
        <div className='w-11/12 h-20 flex justify-center items-center mx-auto'>
            <nav className="flex justify-between items-center w-full">
            <Link
              to="/"
              className="text-5xl w-fit px-4 font-bold text-blue-700 overflow-hidden font "
            >
              Hotel Hub
            </Link>
            <ul className="flex justify-between items-center gap-x-10">
              <li>
                <Link
                  to="/hotel"
                  className="text-black font-sans hover:text-orange-500 transition duration-300"
                >
                  Booking
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-black font-sans hover:text-orange-500 transition duration-300"
                >
                  About-us
                </Link>
              </li>
              <li>
                <Link to="/contectus" className="text-black font-sans hover:text-orange-500 transition duration-300">Contact us</Link>
              </li>
            </ul>
          <div className='flex  items-center justify-center gap-x-5'>
                <button>
                    {
                        !token ? <span><Link to="/login">LOGIN</Link></span> : <ProfileDropDown/>
                    }
                </button>
                <button>
                    {
                        !token && <span><Link to="/signup">SIGNUP</Link></span>
                    }
                </button>
          </div>
          </nav>
      </div>
    </div>
  )
}

export default Navbar