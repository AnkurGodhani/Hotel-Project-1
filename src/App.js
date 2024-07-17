
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Login';
// import HomePage from './comeponets/HomePage';
import Navbar from './comeponets/Navbar';
import Signup from './page/Signup';
import OTPpage from './page/OTPpage'
import Hotel from './comeponets/Booking_Of_hotels/Hotel';
import HotelBook from './comeponets/Booking_Of_hotels/HotelBook';
import HomePage1 from './comeponets/Booking_Of_hotels/HomePage1';
import InsertHotel from './comeponets/AdminSection/Mangehotels/InsertHotel';
import About from './comanPage/About';
import Contactus from './comanPage/Contactus';
import Sidebar from './comeponets/Deshbord/Sidebar';
import { useSelector } from 'react-redux';
import Admindashboard from './comeponets/Deshbord/Admindashboard';
import Payment from './comeponets/Deshbord/Payment';
import Rooms from './comeponets/Deshbord/Rooms';
import Userbooking from './comeponets/Deshbord/Userbooking';
import Ownerdetails from './comeponets/AdminSection/Ownerdetails';
import UserProfile from './comeponets/Deshbord/Userprofile';
import Bookings from './comeponets/Deshbord/Bookings'
import UserSettings from './page/Usersettings';
import Customer from './comeponets/Deshbord/Customer';
import Authrouter from './comanPage/Authrouter';
import Bookingsidebar from './comeponets/Booking_Of_hotels/Bookingsidebar';
import CustomerDetail from './comeponets/Deshbord/CustomerDetail';

function App() {
  const {user} = useSelector((state)=>state.auths)

  return (
    <div>
            <Authrouter>
                 <Navbar/> 
            </Authrouter>
        <Routes>
            <Route path='/' element={<HomePage1/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/OTPpage' element={<OTPpage/>} />
            <Route path='/hotel' element={<Hotel/>} />
            <Route path='/hotel/booking/:hotelId' element={<HotelBook/>}/>
            <Route path='/aboutus' element={<About/>} />
            <Route path='/contectus' element={<Contactus/>} />
            <Route path='/deshbord' element={<Sidebar/>}>

            {
              user !==null && 
               user.accountType !== "customer" ? (
                <>
                <Route path='profile' element={<UserProfile/>} />
                <Route path='Admin' element={<Admindashboard/>} />
                <Route path='admin/payment' element={<Userbooking/>} />
                <Route path='room' element={<Rooms/>} />
                <Route path='OwnderDetail' element={<Ownerdetails/>} />
                <Route path="customerDetail" element={<CustomerDetail/>} />
                <Route path='booking' element={<Customer/>} />
                <Route path='hotels' element={<InsertHotel/>} />
                <Route path='setting' element={<UserSettings/>} />
                </>
            ):(
              <>
              <Route path='profile' element={<UserProfile/>} />
                <Route path='user/booking' element={<Bookings/>} />
                <Route path='paymentcomplete' element={<Payment/>} />
                <Route path='setting' element={<UserSettings/>} />
              </>
            )
            }
            </Route>
        </Routes>  
    </div>
  );
}

export default App;
