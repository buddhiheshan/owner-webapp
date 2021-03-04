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

class Layout extends Component {

    componentDidMount(){
        this.props.dispatchGetPropertyInfo();
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
                        <Col sm={8} className="container-fluid MainPanel">
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
