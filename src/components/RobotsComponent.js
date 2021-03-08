// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Card, Container, Jumbotron } from 'react-bootstrap';
// import Loading from './LoadingComponent';

// import { getRobots } from '../redux/actions/robotsActions'

// class Robots extends Component {

//     componentDidMount() {
//         this.props.getRobots(this.props.property.id)
//     }

//     render() {
//         console.log("robot rendered");
//         const Robots = this.props.robots.robots.map((robot) => {
//             return (
//                 <Card key={robot._id} className='m-1'>
//                     <Card.Title className='p-2 m-0'>{robot.nickname}</Card.Title>
//                     <Card.Body className='p-2'>
//                         Status : {robot.status}
//                     </Card.Body>
//                 </Card>
//             );
//         });

//         if (this.props.robots.isLoading) {
//             return (
//                 <div>
//                     <Loading />
//                 </div>
//             );
//         }
//         else
//             return (
//                 <Container className="Robot-panel">
//                     <Jumbotron fluid className="Jumbotron-RobotPanel">WaiterBots</Jumbotron>
//                     {Robots}
//                 </Container>
//             );
//     };
// };

// const mapStateToProps = state => ({
//     robots: state.robots,
//     property: state.property
// });

// export default connect(mapStateToProps, { getRobots })(Robots);

import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getRobots } from '../redux/actions/robotsActions';

import Loading from './LoadingComponent';

import { Media, Container, Jumbotron, ListGroup } from 'react-bootstrap';


function RenderRobots({ robots }) {

    return (
        <ListGroup>
            {
                robots.map((robot, i) => {
                    return (
                        <ListGroup.Item key={i} className="Robot-media">
                            <Media >
                                <Media.Body>
                                    <h5>Nickname: {robot.nickname}</h5>
                                    <ListGroup>
                                        <ListGroup.Item className="RobotDetail">Status: {robot.status}</ListGroup.Item>
                                        <ListGroup.Item className="RobotDetail">ID: {robot._id}</ListGroup.Item>
                                    </ListGroup>
                                </Media.Body>
                            </Media>
                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    );
};

class Robot extends Component {

    componentDidMount() {

        this.props.dispatchGetRobots(this.props.property.id)
    }
    render() {
        return (
            <Container className="Robot-panel">
                <Jumbotron fluid className="Jumbotron-RobotPanel">WaiterBots</Jumbotron>
                {this.props.robots.isLoading ? <Loading /> :
                    <Container>
                        <RenderRobots robots={this.props.robots.robots} />
                    </Container>}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        robots: state.robots
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetRobots: (propertyID) => dispatch(getRobots(propertyID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Robot);