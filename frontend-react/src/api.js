import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/" });

export const getDrivers = () => api.get("/drivers");

export const signIn = (userData) => api.post("users/signin", userData);

export const signUp = (userData) => api.post("users/signup", userData);
