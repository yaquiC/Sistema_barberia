import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUsers = () =>
  axios.get(API_URL, getConfig());

export const createUser = (user) =>
  axios.post(API_URL, user, getConfig());