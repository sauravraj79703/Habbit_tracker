
   
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // ✅ important for cookie auth
});

export default API;


