import api, { authApi } from "./axiosConfig";

const REST_API_BASE_URL = "http://localhost:8080/api/tickets";

export const reserveTicket = (payload) =>
  authApi().post(`${REST_API_BASE_URL}`, payload);

export const getTicketsByUserUsername = (username) =>
  authApi().get(`tickets/user/${username}`);

export const cancelTicket = (ticketId) =>
  authApi().delete(`tickets/${ticketId}`);

export const reviewTicket = (ticketId, payload) =>
  api.post(`/reviews`, { ...payload, ticketId }); // send ticketId in body
