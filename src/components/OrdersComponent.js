import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getOrders } from '../redux/actions/ordersAction';
import { getItems } from '../redux/actions/itemActions';

import Loading from '../components/LoadingComponent';
import OrdersTab from './OrdersTabComponent';

import { Jumbotron, Container } from 'react-bootstrap';

class Menu extends Component {

    componentDidMount() {
        console.log(this.props.property.id);
        this.props.dispatchGetItems(this.props.property.id)
        this.props.dispatchGetOrders(this.props.property.id, "Pending", "SET_PENDING_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Preparing", "SET_PREPARING_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Delivering", "SET_DELIVERING_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Delivered", "SET_DELIVERED_ORDERS")
        this.props.dispatchGetOrders(this.props.property.id, "Cancelled", "SET_CANCELLED_ORDERS")
    }

    render() {
        if (this.props.orders.isLoading) {
            return (
                <div>
                    <Loading />
                </div>
            );
        }
        else
            return (
                <Container className="Orders">
                    <Jumbotron>Processing Orders</Jumbotron>
                    <OrdersTab />
                </Container>
            );
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetOrders: (propertyID, status, actionType) => dispatch(getOrders(propertyID, status, actionType)),
    dispatchGetItems: (propertyID) => dispatch(getItems(propertyID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);