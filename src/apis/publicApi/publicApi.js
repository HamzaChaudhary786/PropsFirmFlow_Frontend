// api/newsLetterApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/newsletter";

export const sendNewsLetter = async (newsLetter) => {
  const response = await axios.post(`${API_BASE}/subscribe`,  { email: newsLetter }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
