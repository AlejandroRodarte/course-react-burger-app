import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as actions from '../../store/actions';

class Orders extends Component {

    state = {
        loading: true
    };

    async componentDidMount() {

        try {
            await this.props.onStartSetOrders();
            this.setState(() => ({ loading: false }));
        } catch (e) {
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
    onStartSetOrders: () => dispatch(actions.startSetOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));