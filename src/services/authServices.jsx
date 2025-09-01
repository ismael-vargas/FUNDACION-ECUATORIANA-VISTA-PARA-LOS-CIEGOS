import axios from 'axios'

const apiBackend = import.meta.env.VITE_API_URL

export const loginRequest = async (data) => {
    const response = await axios.post(`${apiBackend}/auth/login`, data);
    return response.data;
  }
  