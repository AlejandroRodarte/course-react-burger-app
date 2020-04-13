import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as actions from '../../store/actions';

class Orders extends Component {

    async componentDidMount() {

        if (this.props.orders.length === 0) {
            try {
                await this.props.onStartSetOrders();
            } catch (e) { }
        }

    }

    render() {

        const ordersJsx = this.props.orders.map((order) => <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />);

        return (
            <div>
                { this.props.loading && <Spinner /> }
                { this.props.hasError ? <p>Error loading orders!</p> : ordersJsx }
            </div>
        );

    }

}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    loading: state.orders.loading,
    hasError: !!state.orders.error
});

const mapDispatchToProps = dispatch => ({
    onStartSetOrders: () => dispatch(actions.startSetOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));