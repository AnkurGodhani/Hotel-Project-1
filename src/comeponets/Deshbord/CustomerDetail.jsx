import { Avatar } from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { userAdmin } from '../../service/opretions/authOpretion';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';


const CustomerDetail = () => {
    const {token} = useSelector((state)=>state.auths)
    const users = async() =>{
       const result= await userAdmin(token)
       return result
    }

    const {isLoading,data} = useQuery({queryKey:["userInfo"],queryFn:users,staleTime:50000})
  return (
    <div className='mt-10'>
        {
             data?.map((userInfo)=>(
                <div className=' shadow-lg mt-10 rounded-lg'>
                    <div className='w-9/12 flex justify-between mx-auto items-center '>
                        <div className='flex flex-col gap-y-3 border-r-2 px-8 py-2'>
                            <span className=' font-bold'>Total Cost</span>
                            <p className=' text-3xl font-semibold'>$10440.2k</p>
                            <p className=' text-sm'>New cost last 365 day</p>
                        </div>
                        <div className='flex flex-col gap-y-3 border-r-2 px-8 py-2'>
                            <span className=' font-bold'>Total Booking</span>
                            <p className=' text-3xl font-semibold'>{userInfo.BookingRoom.length}</p>
                            <p className=' text-sm'>New booking last 365 day</p>
                        </div>
                        <div className='flex flex-col gap-y-3 border-r-2 px-8 py-2'>
                            <span className=' font-bold'>completed</span>
                            <p className=' text-3xl font-semibold'>{userInfo.BookingRoom.length}</p>
                            <p className=' text-sm'>New completed last 365 day</p>
                        </div>
                        <div className='flex flex-col gap-y-3 border-r-2 px-8 py-2'>
                            <span className=' font-bold'>cancel</span>
                            <p className=' text-3xl font-semibold'>0</p>
                            <p className=' text-sm'>cancel booking last 365 day</p>
                        </div>
                    </div>
                    <div className='flex border w-10/12 mx-auto mt-2'></div>
                    <div className='flex justify-start w-11/12 mx-auto gap-x-14 mt-8'>
                        <div className=' w-4/12 min-w-[360px] mb-2 '>
                            <span>Customer Information</span>
                            <div className=' shadow-md flex flex-col gap-y-5 mt-2 p-1.5 rounded-lg bg-white'>
                                <section className='flex justify-between p-2'>
                                    <div>
                                        <p>Name</p>
                                        <strong>{userInfo.Name}</strong>
                                    </div>
                                <Avatar>{userInfo.Name.slice(0,1)}</Avatar>
                                </section>
                                <div className=' p-2'>
                                    <p>email</p>
                                    <strong>{userInfo.email}</strong>
                                </div>
                                <div className=' p-2'>
                                    <p>Gender</p>
                                    <strong>{userInfo.sex}</strong>
                                </div>
                                <div className=' p-2'>
                                    <p>PhoneNo</p>
                                    <strong>+91 {userInfo.contact_no}</strong>
                                </div>
                                <div className='flex flex-col p-2'>
                                    <p>Location</p>
                                    <strong>{userInfo.locations ? userInfo.locations : "null"}</strong>
                                    <button className='relative top-2 bg-blue-500 text-white rounded-lg p-2 mb-2 '>Message Send</button>
                                </div>
                    </div>
                        </div>
                        <div className='w-full'>
                            <span className='flex gap-x-2 font-bold'>Booking Order {">"}<p className=' text-gray-600'>AllOrder</p></span>
                            <div className='w-full mt-2'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">selectRoomNo</TableCell>
                                        <TableCell align="right">NumberOfMember</TableCell>
                                        <TableCell align="right">Number_of_room</TableCell>
                                        <TableCell align="right">status</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {userInfo?.BookingRoom?.map((row,index) => (
                                        <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {row._id}
                                        </TableCell>
                                        <TableCell align="right">{row.selectRoomNo}</TableCell>
                                        <TableCell align="right">{row.NumberOfMember}</TableCell>
                                        <TableCell align="right">{row.Number_of_room}</TableCell>
                                        <TableCell align="right">Complete</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
             ))
        }
       
    </div>
  )
}

export default CustomerDetail