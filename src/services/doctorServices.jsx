import axios from 'axios'

const apiBackend = import.meta.env.VITE_API_URL

export const getDoctors = async (data) => {
    const response = await axios.get(`${apiBackend}/doctors`);
    return response.data;
  }
  