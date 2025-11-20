// api/newsLetterApi.js
import axios from "axios";
import { API_BASE } from "../../constants/json/dashboard/apiUrl";
// const API_BASE = "http://localhost:5000/api/newsletter";

export const sendNewsLetter = async (newsLetter) => {
  const response = await axios.post(`${API_BASE}/newsletter/subscribe`,  { email: newsLetter }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
