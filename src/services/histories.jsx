import axios from 'axios'

const apiBackend = import.meta.env.VITE_API_URL

export const addHistory = async (data) => {
    const response = await axios.post(`${apiBackend}/clinical-details`, data, {
    });
    return response.data;
}