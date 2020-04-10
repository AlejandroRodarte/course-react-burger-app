import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as ordersActions from '../../store/actions/orders';

class Orders extends Component {

    state = {
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

            this.props.onSetOrders(orders);
            this.setState(() => ({ loading: false }));

        } catch (e) {
            // console.log(e);
            this.setState(() => ({ loading: false }));
        }

    }

    render() {

        const ordersJsx = this.props.orders.map((order) => <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />);

        return (
            <div>
                { ordersJsx }
            </div>
        );

    }

}

const mapStateToProps = state => ({
    orders: state.orders.orders
});

const mapDispatchToProps = dispatch => ({
    onSetOrders: (orders) => dispatch(ordersActions.setOrders(orders))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));