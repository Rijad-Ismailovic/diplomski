import axios from "axios";
import api, { authApi } from "./axiosConfig";

const REST_API_BASE_URL = "http://localhost:8080/api";

export const register = (payload) =>
  axios.post(REST_API_BASE_URL + "/register", payload);

export const login = (credentials) =>
  axios.post(REST_API_BASE_URL + "/login", credentials);

export const getUser = () => authApi().post("/user");

export const editProfile = (payload) => authApi().post("/user/update", payload);
