// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Accordion, Card, Tabs, Tab, ListGroup, Media } from 'react-bootstrap';

// class RenderOrders extends Component {

//     render() {
//         return (
//             <Accordion defaultActiveKey={1}>
//                 {
//                     this.props.orders.map((order, i) => {
//                         return (
//                             <Card key={i + 1}>
//                                 <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
//                                     Order ID: {order._id}
//                                 </Accordion.Toggle>
//                                 <Accordion.Collapse eventKey={i + 1}>
//                                     <Card.Body>
//                                         <div className="row">
//                                             <div className="col-8">
//                                                 <RenderOrderItems orderedItems={order.items} items={this.props.props.items.items} />
//                                             </div>
//                                             <div className="col-4">
//                                                 <ul>
//                                                     <li>Status: {order.status}</li>
//                                                     <li>Table: {order.table.table_number}</li>
//                                                     <li>Amount: {order.amount}</li>
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                     </Card.Body>
//                                 </Accordion.Collapse>
//                             </Card>
//                         )
//                     })
//                 }
//             </Accordion>
//         )
//     }
// }

// class RenderOrderItems extends Component {

//     render() {
//         let filtered = [];
//         this.props.orderedItems.forEach((ordered) => {
//             const toBeAdded = this.props.items.filter((item) => {
//                 return (item._id === ordered.item)
//             })
//             filtered = [...filtered, ...toBeAdded];
//         });
//         return (
//             <ListGroup>
//                 {
//                     filtered.map((order, i) => {
//                         return (
//                             <ListGroup.Item key={i} className="OrderItems">
//                                 <Media>
//                                     <img
//                                         width={64}
//                                         height={64}
//                                         className="mr-3"
//                                         src={order.imgUrl}
//                                         alt="order"
//                                     />
//                                     <Media.Body>
//                                         <h5>{order.name}</h5>
//                                     </Media.Body>
//                                 </Media>
//                             </ListGroup.Item>
//                         )
//                     })
//                 }
//             </ListGroup>
//         );
//     }
// }

// class OrdersTab extends Component {

//     render() {
//         return (
//             <Tabs defaultActiveKey="Pending" id="uncontrolled-tab-example">
//                 <Tab eventKey="Pending" title="Pending">
//                     <RenderOrders orders={this.props.orders.orders.pending.orders} nextState="Accept" props={this.props} />
//                 </Tab>
//                 <Tab eventKey="Preparing" title="Preparing">
//                     <RenderOrders orders={this.props.orders.orders.preparing.orders} nextState="Deploy Robot" props={this.props} />
//                 </Tab>
//                 <Tab eventKey="Delivering" title="Delivering">
//                     <RenderOrders orders={this.props.orders.orders.delivering.orders} props={this.props} />
//                 </Tab>
//             </Tabs>
//         )

//     }
// }

// const mapStateToProps = state => {
//     return {
//         orders: state.orders,
//         items: state.items
//     }
// }

// export default connect(mapStateToProps)(OrdersTab);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Card, Tabs, Tab, Button, ListGroup, Media, Image, Row, Col } from 'react-bootstrap';


class RenderOrders extends Component {

    render() {
        return (
            <Accordion defaultActiveKey={1}>
                {
                    this.props.orders.map((order, i) => {
                        return (
                            <Card key={i + 1} className="OrderItem">
                                <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                                    Order ID: {order._id}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={i + 1}>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={7}>
                                                <RenderOrderItems orderedItems={order.items} items={this.props.items} />
                                            </Col>
                                            <Col>
                                                <ul>
                                                    <li>Status: {order.status}</li>
                                                    <li>Table: {order.table.table_number}</li>
                                                    <li>Amount: {order.amount}</li>
                                                </ul>
                                                {this.props.nextState ? <Button onClick={() => this.handleClick(order._id, this.props.nextState)}>{this.props.nextState}</Button> : null}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })
                }
            </Accordion>
        )
    }
}

class RenderOrderItems extends Component {

    render() {
        let filtered = [];
        this.props.orderedItems.forEach((ordered) => {
            const toBeAdded = this.props.items.filter((item) => {
                return (item._id === ordered.item)
            })
            filtered = [...filtered, ...toBeAdded];
        });
        return (
            <ListGroup>
                {
                    filtered.map((order, i) => {
                        return (
                            <ListGroup.Item key={i}>
                                <Media>
                                    <Image
                                        rounded
                                        width={64}
                                        height={64}
                                        className="mr-3"
                                        src={order.imgUrl} alt="item"
                                    />
                                    <Media.Body>
                                        <h5>{order.name}</h5>
                                    </Media.Body>
                                </Media>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        );
    }
}

class OrdersTab extends Component {

    render() {
        return (
            <Tabs defaultActiveKey="Pending" className="OrdersTab" >
                <Tab eventKey="Pending" title="Pending">
                    <RenderOrders orders={this.props.orders.orders.pending.orders} items={this.props.items.items} />
                </Tab>
                <Tab eventKey="Preparing" title="Preparing">
                    <RenderOrders orders={this.props.orders.orders.preparing.orders} items={this.props.items.items} />
                </Tab>
                <Tab eventKey="Delivering" title="Delivering">
                    <RenderOrders orders={this.props.orders.orders.delivering.orders} items={this.props.items.items} />
                </Tab>
                <Tab eventKey="Delivered" title="Delivered">
                    <RenderOrders orders={this.props.orders.orders.delivered.orders} items={this.props.items.items} />
                </Tab>
                <Tab eventKey="Cancelled" title="Cancelled">
                    <RenderOrders orders={this.props.orders.orders.cancelled.orders} items={this.props.items.items} />
                </Tab>
            </Tabs>
        )

    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        items: state.items
    }
}

export default connect(mapStateToProps)(OrdersTab);