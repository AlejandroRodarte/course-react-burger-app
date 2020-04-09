import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    async componentDidMount() {

        try {

            const { data } = await axios.get('/orders.json');

            const orders = [];

            for (const key in data) {
                orders.push({
                    id: key,
                    ...data[key]
                });
            }

            this.setState(() => ({ orders, loading: false }));

        } catch (e) {
            console.log(e);
            this.setState(() => ({ loading: false }));
        }

    }

    render() {

        const ordersJsx = this.state.orders.map((order) => <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />);

        return (
            <div>
                { ordersJsx }
            </div>
        );

    }

}

export default withErrorHandler(Orders, axios);