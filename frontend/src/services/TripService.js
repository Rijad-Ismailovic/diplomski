import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/trips";

export const getAllTrips = () => axios.get(REST_API_BASE_URL);

export const search = (
  departure,
  arrival,
  departureDate,
  returnDate,
  wifi,
  restroom,
  ac,
  outlet,
  reclining,
  maxPrice,
  maxDuration
) => {
  const params = {};

  if (departure) params.departure = departure;
  if (arrival) params.arrival = arrival;
  if (departureDate) params.departureDate = departureDate;
  if (returnDate) params.returnDate = returnDate;

  if (wifi === "true") params.wifi = true;
  if (restroom === "true") params.restroom = true;
  if (ac === "true") params.ac = true;
  if (outlet === "true") params.outlet = true;
  if (reclining === "true") params.reclining = true;
  if (maxPrice) params.maxPrice = maxPrice;
  if (maxDuration) params.maxDuration = maxDuration * 60

  return axios.get(REST_API_BASE_URL + "/search", { params });
};
