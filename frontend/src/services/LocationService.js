import axios from "axios";
import api from "./axiosConfig";

const REST_API_BASE_URL = "http://localhost:8080/api";

//export const getAllLocations = () => api.get("/locations");
export const getAllLocations = () => axios.get(REST_API_BASE_URL + "/locations", {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    } 
});