import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import Navbar from './NavBarComponent';
import Menu from './MenuComponent';
import Robots from './RobotsComponent';
import Orders from './OrdersComponent';
import Property from './PropertyComoponent';
import Tables from './TablesComponents'
import Loading from './LoadingComponent';
import ItemDetails from "./ItemDetailsComponent";
import Operators from "./OperatorsComponent";
import AllOrders from './AllOrdersComponent';

import { getPropertyInfo } from '../redux/actions/propertyActions';
import { pushOrder } from '../redux/actions/ordersAction';

const io = require("socket.io-client");
const connectionUrl = "ws://waiterbot-api.herokuapp.com";

class Layout extends Component {

    componentDidMount(){
        this.props.dispatchGetPropertyInfo();

        const socket = io(connectionUrl, {
            // autoConnect : false,
            transports: ["polling"],
            query: {
                token: localStorage.getItem('token')
            },
        });

        socket.on("connect", msg => {
            console.log("successfully connected to ws!");
        });

        socket.on('join', function (data) { console.log(data); });
        socket.on('error', function (data) { console.log(data); });

        socket.on("private", (data) => {
            console.log("[PRIVATE]  :", data);
        });

        socket.on("newOrder", (data) => {
            this.props.dispatchPushOrder(data);
            // toastr.info("New Order Recieved");
            console.log("[NEW ORDER ]  :", data);
        });

        socket.on("orderStateChange", (data) => {
            console.log("[ORDER STATE CHANGE ]  :", data);
        });
    }

    render() {
        if (this.props.property.isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <Container fluid className="Layout">
                    <Navbar />
                    <Row className="m-0">
                        <Col sm={8} className="container-fluid Main-panel">
                            <Switch>
                                <Route exact path="/menu"><Menu /></Route>
                                <Route exact path="/operators"><Operators /></Route>
                                <Route exact path="/property"><Property /></Route>
                                <Route exact path="/tables"><Tables /></Route>
                                <Route exact path="/orders"><AllOrders /></Route>
                                <Route exact path="/menu/:itemID"><ItemDetails /></Route>
                                <Redirect to='/menu' />
                            </Switch>
                        </Col>
                        <Col className="p-0">
                            <Robots />
                            <Orders />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        property: state.property
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetPropertyInfo: () => dispatch(getPropertyInfo()),
    dispatchPushOrder: (data) => dispatch(pushOrder(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
