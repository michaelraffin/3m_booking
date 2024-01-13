
import Axios from 'axios'; 
export const url = "https://www.smestoreph.com/" //process.env.stagingEndpoint
export const urlFirebase =  "https://different-goat-long-underwear.cyclic.cloud"
export const urlSupBase =  process.env.urlSupaBase
export const mapBoxUrl = process.env.mapBoxEndpoint
export const axiosV2Local = (token,id)=>  Axios.create({
    baseURL:'http://192.168.1.148:9091',
    timeOut:3000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "userID":id
    }
});

export const axios = Axios.create({
    baseURL:url,
    timeOut:3000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDA4NDI2NywiZXhwIjoxOTU1NjYwMjY3fQ.xolRkFiSZYYgBKQkH4NzNstJJVPtABmJBQwFtAHgDg0"
    }
});
export const axiosV2 = (token,id)=>  Axios.create({
    baseURL:url,
    timeOut:3000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "userID":id
    }
});
 
export const productStats = Axios.create({
    baseURL:urlFirebase,
    timeOut:3000,
    headers: {
        "Content-Type": "application/json"
    }
});

export const productLike = Axios.create({
    baseURL:urlSupBase,
    timeOut:3000,
    headers: {
        "Content-Type": "application/json"
    }
});


export const MapBox = Axios.create({
    baseURL:mapBoxUrl,
    timeOut:3000,
    headers: {
        "Content-Type": "application/json"
    }
});



