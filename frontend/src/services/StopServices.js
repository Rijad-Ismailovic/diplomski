import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/stops";

export const getStopsByTripId = (id) => axios.get(REST_API_BASE_URL + "/trip/" + id)