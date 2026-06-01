import axios from "axios";

const API_URL = "http://localhost:3000/api/specialties";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSpecialties = () =>
  axios.get(API_URL, getConfig());

export const createSpecialty = (specialty) =>
  axios.post(API_URL, specialty, getConfig());

export const updateSpecialty = (id, specialty) =>
  axios.put(`${API_URL}/${id}`, specialty, getConfig());

export const deleteSpecialty = (id) =>
  axios.delete(`${API_URL}/${id}`, getConfig());