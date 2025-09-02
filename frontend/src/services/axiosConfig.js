import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:8080/api",
  baseURL: "https://diplomski-35765e9c137c.herokuapp.com/api",
});

export const authApi = () => {
  const token = localStorage.getItem("jwt");
  return axios.create({
    //baseURL: "http://localhost:8080/api",
    baseURL: "https://diplomski-35765e9c137c.herokuapp.com/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export default api;
