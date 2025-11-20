// api/firmApi.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/firm';

// Helper to get Auth0 token
const getAuthHeaders = async (getAccessTokenSilently) => {
  try {
    const token = await getAccessTokenSilently();
    return { Authorization: `Bearer ${token}` };
  } catch (err) {
    console.error("Failed to get token:", err);
    return {};
  }
};

// Create Firm with FormData + Auth
export const createFirm = async (formData, getAccessTokenSilently) => {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  headers['Content-Type'] = 'multipart/form-data';

  const response = await axios.post(API_BASE, formData, { headers });
  return response.data;
};

export const getAllFirm = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_BASE}?page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data; // { total, page, pages, firms }
};

export const updateFirm = async (formData, getAccessTokenSilently) => {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  headers['Content-Type'] = 'multipart/form-data';

  const response = await axios.post(API_BASE, formData, { headers });
  return response.data;
};


export const deleteFirm = async (formData, getAccessTokenSilently) => {
  const headers = await getAuthHeaders(getAccessTokenSilently);
  headers['Content-Type'] = 'multipart/form-data';

  const response = await axios.post(API_BASE, formData, { headers });
  return response.data;
};

