import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as actions from '../../store/actions';

const Orders = ({ token, history, userId, orders, loading, hasError, onStartSetOrders }) => {

    useEffect(() => {
        
        if (!token) {
            history.replace('/builder');
        }
        
        onStartSetOrders(token, userId);

    }, [history, onStartSetOrders, token, userId]);

    const ordersJsx = orders.map((order) => <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />);
    
    return (
        <div>
            { loading && <Spinner /> }
            { hasError ? <p>Error loading orders!</p> : ordersJsx }
        </div>
    );

};

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