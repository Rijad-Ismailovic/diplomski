import axios from "axios";
import api from "./axiosConfig";

const REST_API_BASE_URL = "http://localhost:8080/api";

export const sendContactUsEmail = (payload) =>
  api.post("/emails/contact", payload);
