import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as actions from '../../store/actions';

class Orders extends Component {

    componentDidMount() {

        if (!this.props.token) {
            this.props.history.replace('/builder');
        }

        this.props.onStartSetOrders(this.props.token, this.props.userId);

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
    hasError: !!state.orders.error,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onStartSetOrders: (token, userId) => dispatch(actions.startSetOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));