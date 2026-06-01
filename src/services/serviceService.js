import axios from "axios";

const API_URL = "http://localhost:3000/api/services";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getServices = () =>
  axios.get(API_URL, getConfig());

export const createService = (service) =>
  axios.post(API_URL, service, getConfig());

export const updateService = (id, service) =>
  axios.put(`${API_URL}/${id}`, service, getConfig());

export const deleteService = (id) =>
  axios.delete(`${API_URL}/${id}`, getConfig());