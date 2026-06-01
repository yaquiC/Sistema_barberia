import axios from "axios"

const API_URL = "http://localhost:3000/api/appointment";

const getConfig = () =>({
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }   
});

export const getAppoinments = () => 
    axios.get(API_URL, getConfig());
