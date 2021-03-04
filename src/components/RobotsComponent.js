import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Container, Jumbotron } from 'react-bootstrap';
import Loading from './LoadingComponent';

import { getRobots } from '../redux/actions/robotsActions'

class Robots extends Component {

    componentDidMount() {
        this.props.getRobots(this.props.property.id)
    }

    render() {
        console.log("robot rendered");
        const Robots = this.props.robots.robots.map((robot) => {
            return (
                <Card key={robot._id} className='m-1'>
                    <Card.Title className='p-2 m-0'>{robot.nickname}</Card.Title>
                    <Card.Body className='p-2'>
                        Status : {robot.status}
                    </Card.Body>
                </Card>
            );
        });

        if (this.props.robots.isLoading) {
            return (
                <div>
                    <Loading />
                </div>
            );
        }
        else
            return (
                <Container className="Robots">
                    <Jumbotron>Robots</Jumbotron>
                    {Robots}
                </Container>
            );
    };
};

const mapStateToProps = state => ({
    robots: state.robots,
    property: state.property
});

export default connect(mapStateToProps, { getRobots })(Robots);