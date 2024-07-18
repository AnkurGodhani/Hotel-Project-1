import { createSlice } from "@reduxjs/toolkit"


const initialstate = {
    singupData:null,
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    loading:false
}

const authSlices = createSlice({
    name:"auths",
    initialState:initialstate,
    reducers:{
        settoken(state,value){
            state.token = value.payload
        },
        setuser(state,value){
            state.user = value.payload
        },
        setloading(state,value){
            state.loading = value.payload
        },
        setsingupData(state,value){
            state.singupData = value.payload
        }
    }
})

export const {setloading,settoken,setuser,setsingupData} = authSlices.actions

export default authSlices.reducer;