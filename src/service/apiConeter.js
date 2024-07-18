import axios from "axios";

export const axiosIntance = axios.create({});

export const apiConneter = (method,url,bodyData,headers,params) =>{
    return axiosIntance({
        method : `${method}`,
        url:`${url}`,
        data:bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params : params ? params : null
    });
}   