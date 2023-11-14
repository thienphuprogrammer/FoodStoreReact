import axios from "axios";

export const createOrder = async (order) => {
    try {
        console.log(order);
        const {data} = await axios.post('/api/orders/create', order);
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}


export const getNewOrderForCurrentUser = async () => {
    try {
        const {data} = await axios.get('/api/orders/newOrderForCurrentUser');
        return data;
    } catch (error) {
        throw error;
    }
}

export const pay = async (paymentId) => {
    try {
        const {data} = await axios.put('/api/orders/pay', {paymentId});
        return data;
    } catch (error) {
        throw error;
    }
}

export const trackOrderById = async (orderId) => {
    try {
        const {data} = await axios.get(`/api/orders/track/${orderId}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getAll = async (state) => {
    const {data} = await axios.get(`/api/orders/${state ?? ''}`);
    return data;
}

export const getAllStatus = async () => {
    const {data} = await axios.get('/api/orders/all-status');
    return data;
}