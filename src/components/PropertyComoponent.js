import React, { Component } from 'react';
import { Jumbotron, Image, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import EditImageForm from './EditImageFormComponent';
import EditPropertyForm from './EditPropertyFormComponent';

function RenderDetails({ property }) {
    const RequiredDetails = {
        "Name": property.name,
        "Description": property.description,
        "Address": property.address

    }

    return (
        <div className="col-12 col-md-6 Details">
            {
                Object.keys(RequiredDetails).map((key, i) => (
                    <div className="row" key={i}>
                        <div className="col-3">
                            {key}
                        </div>
                        <div className="col-9">
                            {RequiredDetails[key]}
                        </div>
                    </div>
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
                        <EditImageForm imgURL={this.props.property.imgURL} toggleModal={this.toggleEditImageModal}/>
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

                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                {this.props.property.name}
                            </Col>
                            <Button className="mr-3" onClick={this.toggleEditImageModal}>Edit Image</Button>
                            <Button onClick={this.toggleEditPropertyModal}>Edit Property</Button>
                        </Row>
                    </Container>
                </Jumbotron>

                <Container>
                    <Row className="mt-5">
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