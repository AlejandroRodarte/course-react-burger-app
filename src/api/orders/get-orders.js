import axios from '../../axios/axios-orders';

const getOrders = async ({ token, userId }) => {

    try {

        const { data } = await axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);

        const orders = [];

        for (const key in data) {
            orders.push({
                id: key,
                ...data[key]
            });
        }

        return orders;

    } catch (e) {
        throw e;
    }

};

export default getOrders;
