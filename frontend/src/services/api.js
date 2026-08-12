import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-traffic-violation-detection-3.onrender.com",
});

export default api;