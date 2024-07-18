
import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EditBooking } from '../service/opretions/hotelIn';


const AdminEditBookRoom = ({editData,id}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auths)
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues:{
            Name : `${editData?.Name}`,
            contact_no : `${editData?.contact_no}`,
            email:`${editData?.email}`,
            Number_of_room:`${editData?.Number_of_room}`,
            age:`${editData?.age}`,
            start_Room_Book_Date:`${editData?.start_Room_Book_Date}`,
            End_Room_Book_Date:`${editData?.End_Room_Book_Date}`,
            sex:`${editData?.sex}`,
            NumberOfMember:`${editData?.NumberOfMember}`,
            selectRoomNo:`${editData?.selectRoomNo}`,
            identite:`${editData?.identite}`
        }
    });

    


    const handleonBook = async(data) =>{
        const bookData = new FormData();
        bookData.append("BookingId",id)
        bookData.append("Name",data.Name)
        bookData.append("contact_no",data.contact_no)
        bookData.append("email",data.email)
        bookData.append("Number_of_room",data.Number_of_room)
        bookData.append("age",data.age)
        bookData.append("start_Room_Book_Date",data.start_Room_Book_Date)
        bookData.append("End_Room_Book_Date",data.End_Room_Book_Date)
        bookData.append("sex",data.sex)
        bookData.append("NumberOfMember",data.NumberOfMember)
        bookData.append("selectRoomNo",data.selectRoomNo)
        dispatch(EditBooking(bookData,token,navigate))
    }

  return (
    <div className='  bg-white flex justify-center h-fit items-start mx-auto w-fit  gap-x-20'>
        <div className='max-w-[650px] flex rounded-lg shadow-lg'>
            <form onSubmit={handleSubmit(handleonBook)} className=' flex flex-col justify-center items-start w-full gap-y-5 p-10'>
                 <label className='flex flex-col w-full'>
                     <p className=' text-md font-bold text-gray-800 '>Name</p>
                     <input type="text" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("Name")}/>
                 </label>
                <div className='flex w-full gap-x-10'>
                <label className='flex flex-col w-full'>
                     <p className=' text-md font-bold text-gray-800 '>Phone-Number</p>
                     <input type="tel" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("contact_no")}/>
                 </label>
                 <label className='flex flex-col w-full'>
                     <p className=' text-md font-bold text-gray-800 '>Email</p>
                     <input type="tel" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("email")}/>
                 </label>
                </div>
                 <div className='flex w-full gap-x-10'>
                    <label className='flex flex-col w-full'>
                        <p className=' text-md font-bold text-gray-800 '>start-Date</p>
                        <input type="date" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("start_Room_Book_Date",)}/>
                    </label>
                    <label className='flex flex-col w-full'>
                        <p className=' text-md font-bold text-gray-800'>end-Date</p>
                        <input type="date" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("End_Room_Book_Date",)}/>
            
                    </label>
                 </div>
                 <div className='flex w-full gap-x-10'>
                 <label className='flex flex-col w-full'>
                     <p  className=' text-md font-bold text-gray-800 '>Gender</p>
                     <select className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("sex")} >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                      </select>
                 </label>
                 <label className='flex flex-col w-full'>
                      <p className=' text-md font-bold text-gray-800 '>totalRoom-Requied</p>
                      <input type="tel"  className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("Number_of_room",)}/>
                 </label>
                 </div>
                 <div className='flex w-full gap-x-10'>
                 <label className='flex flex-col w-full'>
                      <p className=' text-md font-bold text-gray-800 '>Members</p>
                      <select className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("NumberOfMember")} >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                      </select>
                 </label>
                 <label className='flex flex-col w-full'>
                      <p className=' text-md font-bold text-gray-800 '>age</p>
                      <input type="number" className=' border-b-2 outline-none border-blue-800 p-0.5 ' {...register("age")}/>
                 </label>
                 </div>
            <button className=' mx-auto p-2 bg-blue-800 w-full rounded-md text-white font-semibold' type='submit'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default AdminEditBookRoom