import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api/trips"

export const getAllTrips = () => axios.get(REST_API_BASE_URL);

export const search = (departure, arrival, departureDate, returnDate) => {
    return axios.get(
      REST_API_BASE_URL + "/search", {
        params: {
          departure: departure,
          arrival: arrival,
          departureDate: departureDate,
          returnDate: returnDate
        }
      }
    );
}

