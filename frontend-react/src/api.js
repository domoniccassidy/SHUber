import axios from "axios";

const api = axios.create({ baseURL: "https://shuber2.herokuapp.com/" });

export const getDrivers = () => api.get("/drivers");

export const signIn = (userData) => api.post("users/signin", userData);

export const signUp = (userData) => api.post("users/signup", userData);

export const verifyCard = (id) => api.put(`users/verify/${id}`);

export const review = (id, userData) => api.patch(`drivers/${id}`, userData);
