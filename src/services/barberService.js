import axios from "axios";

const API_URL = "http://localhost:3000/api/barbers";

const getConfig = () => ({
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    
    },
});

export const getBarbers = () =>
    axios.get(API_URL,getConfig());

export const createBarber = (barber) =>
    axios.post(API_URL,barber,getConfig());

export const updateBarber = (id, barber) =>
    axios.put(`${API_URL}/${id}`,barber,getConfig());

export const deleteBarber = (id) =>
    axios.delete(`${API_URL}/${id}`,getConfig());