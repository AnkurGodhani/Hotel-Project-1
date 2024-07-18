import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { CiCircleRemove } from "react-icons/ci";
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { RegsisterHotel } from '../../../service/opretions/hotelIn';
import Googlemaphook from '../../../hook/Googlemaphook';


const InsertHotel = () => {

    const [selectFile,setselectFile] = useState([]);
    const [item,setitem] = useState('')
    const [add,setadd] = useState([])


    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        reset
    } = useForm();

    let inputRef = useRef(null);

    const onDrop = (acceptedFiles) =>{
        let file = acceptedFiles[0]
        setselectFile((image)=>[...image,file])
    }


    const {getRootProps,getInputProps} =useDropzone({
        accept:{"image/*":["jpeg","jpg","png"]},
        onDrop,
        maxFiles:20,
        multiple:true
    })

    useEffect(()=>{
        setValue("hostel_image",selectFile)
    },[selectFile,setValue])

     console.log("Mutiple Files is set",selectFile)

     const {token} = useSelector((state)=>state.auths)

        const handleonadd = () => {
            if(item){
                setadd(element => [...element,item])
                toast.success("item is added")
            }
        }

        const handleRemove = (data) => () => {
            setadd((chips) => chips.filter((chip) => chip !== data));
          };

        const handleDelete = (data) => () => {
            setselectFile((chips) => chips.filter((chip) => chip.name !== data.name));
          };
     
        const handleonData = async(data) =>{
             console.log("data",data)
             const data1 = new FormData();
             data1.append("hostelName",data.hostelName)
             data1.append("ownderName",data.ownderName)
             data1.append("place_location",data.place_location)
             data1.append("totalRoom",data.totalRoom)
             data1.append("contact_no",data.contact_no)
             data1.append("Price",data.Price)
             data1.append("Description",data.Description)
             add.map((todus)=>{
                 data1.append("Facilities",todus)
             })
             data1.append("Text_and_charges",data.Text_and_charges)
            selectFile.map((images)=>{
                data1.append("hostel_image",images)
            })
             await RegsisterHotel(data1,token)
             
        }
          
        
  return (
    <div className='m-3 flex justify-between items-center px-20'>
        <div className='w-[50%]'>
            <Googlemaphook />
        </div>
        <div className='w-5/12  p-5 shadow-xl'>
            <form onSubmit={handleSubmit(handleonData)} className='flex flex-col gap-y-4'>
              <div className='flex w-full gap-x-5'>
                <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>hotelName</p>
                        <input type="text" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("hostelName",{required:true})}/>
                    </label>
                    <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>ownderName</p>
                        <input type="text" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("ownderName",{required:true})}/>
                    </label>
              </div>
              <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5 '>Location</p>
                        <input type="text" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("place_location",{required:true})}/>
              </label>
              <div className='flex w-full gap-x-5'>
                <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>TotalRooms</p>
                        <input type="tel" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95'  {...register("totalRoom",{required:true})}/>
                    </label>
                    <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>Price</p>
                        <input type="tel" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("Price",{required:true})}/>
                    </label>
              </div>
              <label {...getRootProps()}>
                    <p className='text-md text-black font-bold capitalize px-2.5'>Image of Hotel</p>
                    <div  className='w-full mt-1.5 mb-2 border-2 flex justify-center items-center rounded-lg overflow-hidden'>
                         <input {...getInputProps()} ref={inputRef} id='hostel_image'/>
                         <div className='p-1.5 border-2 border-text-500 text-center outline-none w-full rounded-lg text-gray-600 opacity-95'>SELECTING FILE</div>
                    </div>
                    <div className='w-full flex flex-col gap-y-5'>
                        {
                            selectFile.length > 0 ? selectFile.map((image)=>(
                            <div className='flex justify-between items-center border-b-2 w-full mx-auto p-3 rounded-lg'>
                                <div className='w-[150px] h-[97px]  overflow-hidden rounded-md'>
                                    <img src={URL.createObjectURL(image)} className='w-[150px] h-[97px]'></img>
                                </div>
                                <span className='text-center'>{image.name}</span>
                                <button type='button' className='bg-red-600 flex items-center gap-x-1 text-white rounded-lg px-2.5 py-1.5 font-semibold' onClick={handleDelete(image)} ><MdDelete />DELETE </button>
                            </div>))
                             : (<span className='text-red-500 text-xs font-bold mx-3'>Upload a file chosen PNG,JPG,JPEG</span>)
                         }
                    </div>
              </label>
              <div className='flex w-full gap-x-5'>
                <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>contact_no</p>
                        <input type="tel" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("contact_no",{required:true})}/>
                    </label>
                    <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>Text_and_charges</p>
                        <input type="text" placeholder='THE LALIT' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("Text_and_charges",{required:true})}/>
                    </label>
              </div>
              
             <label className='flex flex-col gap-y-1.2 w-full mb-2'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>Facilities</p>
                        <div className='flex gap-x-5'>
                        <input type="text" placeholder='ADD FACILITIES' className='p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' onChange={(e)=>setitem(e.target.value)} />
                        <button type='button' onClick={handleonadd} className='bg-green-600 px-3 rounded-md text-white'>
                            ADD
                        </button>
                        </div>
                        <div className=' w-fit  gap-x-2 mt-2 ml-5'>
                            {
                                add &&  add?.map((items)=>(<ul className='border-2 rounded-xl p-2 mt-1 bg-gray-200 font-semibold text-gray-700 list-inside'><li className='flex items-center gap-x-2'>{items}<CiCircleRemove onClick={handleRemove(items)} /></li></ul>))
                            }
                            </div>
             </label>
             <label className='flex flex-col gap-y-1.2 w-full'>
                        <p className='text-md text-black font-bold capitalize px-2.5'>Description</p>
                        <textarea rows={4} className=' resize-none p-1.5 border-2 border-text-500 outline-none w-full rounded-lg text-gray-600 opacity-95' {...register("Description",{required:true})}/>
             </label>
             <button type="submit" className='w-full text-white bg-stone-700 p-2 rounded-md font-bold hover:bg-stone-800 transition-all duration-200 ease-in-out'>
                PROCESS
             </button>
             
            </form>
        </div>
    </div>
  )
}

export default InsertHotel