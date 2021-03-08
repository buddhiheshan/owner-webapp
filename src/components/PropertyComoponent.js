import React, { Component } from 'react';
import { Jumbotron, Image, Container, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import EditImageForm from './EditImageFormComponent';
import EditPropertyForm from './EditPropertyFormComponent';

function RenderDetails({ property }) {
    const RequiredDetails = {
        "Name": property.name,
        "Address": property.address,
        "Description": property.description
        

    }

    return (
        <div className="col-12 col-md-6 Details">
            {
                Object.keys(RequiredDetails).map((key, i) => (
                    <ListGroup.Item key={i}>
                        <Row>
                            <Col md={4}>
                                {key}
                            </Col>
                            <Col md={8}>
                                <p>
                                {RequiredDetails[key]}
                                </p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))
            }
        </div>
    )
}

class Property extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditImageModalOpen: false,
            isEditPropertyModalOpen: false
        };

        this.toggleEditImageModal = this.toggleEditImageModal.bind(this);
        this.toggleEditPropertyModal = this.toggleEditPropertyModal.bind(this);
    };

    toggleEditImageModal() {
        this.setState({
            isEditImageModalOpen: !this.state.isEditImageModalOpen
        });
    }

    toggleEditPropertyModal() {
        this.setState({
            isEditPropertyModalOpen: !this.state.isEditPropertyModalOpen
        });
    }

    render() {
        return (
            <React.Fragment>

                <Modal show={this.state.isEditImageModalOpen} onHide={this.toggleEditImageModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Property Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditImageForm imgURL={this.props.property.imgURL} toggleModal={this.toggleEditImageModal} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.isEditPropertyModalOpen} onHide={this.toggleEditPropertyModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Property Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditPropertyForm toggleModal={this.toggleEditPropertyModal} />
                    </Modal.Body>
                </Modal>

                <Jumbotron className="Jumbotron-MainPanel">
                    <Row>
                        <Col>
                            {this.props.property.name}
                        </Col>
                        <Button size="lg" className="mr-3" onClick={this.toggleEditImageModal}>Edit Image</Button>
                        <Button size="lg" onClick={this.toggleEditPropertyModal}>Edit Property</Button>
                    </Row>
                </Jumbotron>

                <Container>
                    <Row className="ItemDetails">
                        <Col md={6}>
                            <Image src={this.props.property.imgURL} fluid rounded />
                        </Col>
                        <RenderDetails property={this.props.property} />
                    </Row>
                </Container>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    property: state.property
})


export default connect(mapStateToProps)(Property)