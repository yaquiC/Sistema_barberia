import axios from "axios";

const API_URL = "http://localhost:3000/api/appointments";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAppointments = () => axios.get(API_URL, getConfig());

export const getAppointmentById = (id) => axios.get(`${API_URL}/${id}`, getConfig());

export const createAppointment = (appointment) => axios.post(API_URL, appointment, getConfig());

export const updateAppointment = (id, appointment) =>
  axios.put(`${API_URL}/${id}`, appointment, getConfig());

export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`, getConfig());
