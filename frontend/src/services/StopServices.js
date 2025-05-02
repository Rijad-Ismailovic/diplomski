import axios from "axios";
import api from "./axiosConfig";


const REST_API_BASE_URL = "http://localhost:8080/api/stops";

//export const getStopsByTripId = (id) => axios.get(REST_API_BASE_URL + "/trip/" + id)
export const getStopsByTripId = (id) => api.get("/stops/trip/" + id)
