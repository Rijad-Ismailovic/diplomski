import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const authApi = () => {
  const token = localStorage.getItem("jwt");
  return axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export default api;
