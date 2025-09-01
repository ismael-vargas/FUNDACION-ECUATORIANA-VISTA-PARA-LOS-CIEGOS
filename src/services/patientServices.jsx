import axios from 'axios'

const apiBackend = import.meta.env.VITE_API_URL

export const findPatientCC = async (data) => {
    const response = await axios.get(`${apiBackend}/patients/id/${+data}`);
    return response.data;
  }

export const newPatient = async (data) => {
    const response = await axios.post(`${apiBackend}/patients`, data);
    return response.data;
  }
  //hola mundo