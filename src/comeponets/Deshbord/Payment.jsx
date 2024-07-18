import React, { useEffect, useState } from 'react'
import PaymentComplete from '../../models/PaymentComplete'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { findbookingpayment } from '../../service/opretions/paymetofhotel';
import { useSelector } from 'react-redux';

const Payment = () => {
    const [open, setOpen] = React.useState(false);
    const [results,setresult] = useState(null)
    const {token} = useSelector((state)=>state.auths)

    console.log("result of Data",results)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  return (
    <div className='flex flex-col h-[80vh] justify-center items-center'>
      <Button variant="outlined" sx={{paddingBlock:"12px"}} onClick={handleClickOpen}>
         Open form dialog
      </Button>
      <Dialog
        open={open}
        sx={{bgcolor:"gray"}}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            const result = await findbookingpayment(email,token)
                if(result){
                    setresult(result)
                }
                else{
                    return <div>Booking Not Found!</div>
                }
            handleClose();
          },
        }}
      >
        <DialogTitle>Payment Conformation</DialogTitle>
   
        <DialogContent>
          <DialogContentText>
            To sending Booking email your mail, please enter your BookingId here. We
            will send completed details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Conformation</Button>
        </DialogActions>
      </Dialog>
      {
         results &&  <div className="container mx-auto p-4">
         <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
             <div className="bg-blue-500 p-4">
                 <h2 className="text-white text-xl font-bold">Payment Completed</h2>
             </div>
             <div className="p-4">
                 <p className="text-gray-600 text-sm mb-2">Thank you for your payment. Here are your details:</p>
                 <div className="mb-4">
                     <h3 className="text-gray-800 text-lg font-semibold">Booking ID:</h3>
                     <p className="text-gray-700">{results.payment?.BookingId?._id}</p>
                 </div>
                 <div className="mb-4">
                     <h3 className="text-gray-800 text-lg font-semibold">Name:</h3>
                     <p className="text-gray-700">{results.payment?.BookingId?.Name}</p>
                 </div>
                 <div className="mb-4">
                     <h3 className="text-gray-800 text-lg font-semibold">Total Payment Amount:</h3>
                     <p className="text-gray-700">{results.payment?.amount}</p>
                 </div>
                
                 <div className="mb-4">
                     <h3 className="text-gray-800 text-lg font-semibold">Status:</h3>
                     <p className="text-green-700 text-lg font-semibold">Completed</p>
                 </div>
                 {/* <div className="text-center">
                     <a href="/Profilepage" className="bg-blue-500 text-white px-4 py-2 rounded">Go to Profile</a>
                 </div> */}
             </div>
         </div>
     </div> 
      }
    </div>
  )
}

export default Payment