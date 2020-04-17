import axios from '../../axios/axios-orders';

const addOrder = async ({ order, token }) => {

    try {
        const { data } = await axios.post(`/orders.json?auth=${token}`, order);
        return data;
    } catch (e) {
        throw e;
    }

};

export default addOrder;
