import React, { Component } from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'

class Tables extends Component {
    render() {
        return (
            <React.Fragment>

                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                Tables
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>

            </React.Fragment>
        )
    }
}

export default Tables;