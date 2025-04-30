import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api";

export const register = (payload) => axios.post(REST_API_BASE_URL + "/register", payload);

export const login = (credentials) => axios.post(REST_API_BASE_URL + "/login", credentials)