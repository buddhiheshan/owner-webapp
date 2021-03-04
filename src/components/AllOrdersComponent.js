import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col,Tabs, Tab } from 'react-bootstrap'

class AllOrders extends Component {
    render() {
        return (
            <React.Fragment>

                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                Orders
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>


                <Container>
                    <Tabs defaultActiveKey="Pending" id="uncontrolled-tab-example">
                        <Tab eventKey="Pending" title="Pending">
                            {/* <RenderOrders orders={this.props.orders.orders.pending.orders} nextState="Accept" props={this.props} /> */}
                        </Tab>
                        <Tab eventKey="Preparing" title="Preparing">
                            {/* <RenderOrders orders={this.props.orders.orders.preparing.orders} nextState="Deploy Robot" props={this.props} /> */}
                        </Tab>
                        <Tab eventKey="Delivering" title="Delivering">
                            {/* <RenderOrders orders={this.props.orders.orders.delivering.orders} props={this.props} /> */}
                        </Tab>
                    </Tabs>
                </Container>
            </React.Fragment>
        )
    }
}

export default AllOrders;