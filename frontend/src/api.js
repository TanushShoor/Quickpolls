// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000",
  withCredentials: true,
});

export default api;


// export const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true, // ensure cookies sent
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// export default api;
