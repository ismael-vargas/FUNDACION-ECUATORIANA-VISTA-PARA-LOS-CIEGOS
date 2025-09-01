import axios from 'axios'

const apiBackend = import.meta.env.VITE_API_URL

export const newBudget = async (token, data) => {
    const response = await axios.post(`${apiBackend}/budgets`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
}

export const getBudgets = async (token) => {
    const response = await axios.get(`${apiBackend}/budgets`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const updateBudget = async (token, id, data) => {
    const response = await axios.patch(`${apiBackend}/budgets/${id}`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const findBudget = async (id, token) => {
    const response = await axios.get(`${apiBackend}/budgets/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getServices = async () => {
    const response = await axios.get(`${apiBackend}/services`);
    return response.data;
}
