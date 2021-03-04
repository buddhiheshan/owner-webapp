import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import { postEditProperty } from '../redux/actions/propertyActions';

class EditPropertyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.property.name,
            description: this.props.property.description,
            address: this.props.property.address

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleUpload(event) {
        this.props.toggleModal();
        this.props.dispatchPostEditProperty(this.props.property.id, this.state);
        event.preventDefault();
    }

    render() {
        return (
            <Form>

                <Form.Group controlId="name">
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control type="text" placeholder={this.state.name} name="name" value={this.state.name} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder={this.state.address} name="address" value={this.state.address} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={10} type="text" placeholder={this.state.description} name="description" value={this.state.description} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Button onClick={this.handleUpload}>Upload</Button>
                </Form.Group>

            </Form>
        )
    }
}

const mapStateToProps = (state) => ({
    property: state.property
})

const mapDispatchToProps = dispatch => ({
    dispatchPostEditProperty: (propertyID, property) => dispatch(postEditProperty(propertyID, property))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPropertyForm);
