import axios from "axios"

export const api = axios.create({
  baseURL: "https://feedbacks-server-production-2614.up.railway.app",
})
