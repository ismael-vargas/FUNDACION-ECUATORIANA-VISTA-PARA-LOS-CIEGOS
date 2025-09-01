import axios from 'axios'

const apiBackend = import.meta.env.VITE_API_URL

export const newAppointment = async (data) => {
    const response = await axios.post(`${apiBackend}/appointments`, data);
    return response.data;
  }

export const clinicalHistory = async (id) => {
    const response = await axios.get(`${apiBackend}/history/list/${id}`);
    return response.data;
}
  