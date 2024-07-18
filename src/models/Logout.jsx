import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from '../service/opretions/authOpretion'

export default function Logout() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='w-fit'>
      <p onClick={handleOpen} className=' text-black'>Logout</p>
      <Backdrop
        sx={{ color: '#fff', width:"100%", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
       <div className='w-[600px] border-2 flex flex-col justify-center  bg-white text-black p-5 rounded-md'>
           <div className='flex gap-x-2 w-full'>
            <div className=' opacity-80 text-red-400'><FiAlertTriangle  size={30}/></div>
            <div className='flex flex-col gap-y-3 items-start justify-center'>
                <h1 className=' font-bold'>Deactivate account</h1>
                <p className='text-wrap text-gray-600 opacity-90'>Are you sure you want to deactivate your account? All of your data will be removed from localStorage our servers forever. This action cannot be undone</p>
            </div>
           </div>
           <div className='flex mt-3 gap-x-3 ml-6'>
                <button type='sumbit' className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>dispatch(logout(navigate))}>Logout</button>
                <button type='button' onClick={() => setOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">cancel</button>
           </div>
       </div>
      </Backdrop>
    </div>
  );
}
