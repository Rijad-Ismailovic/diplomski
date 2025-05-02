import axios from "axios";

const token = localStorage.getItem("jwt");

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default api;
