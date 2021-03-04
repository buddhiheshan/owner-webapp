import React, { Component } from 'react'

import { Form, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

class DeleteForm extends Component {

    render() {
        return (
            <Form>

                <Form.Group>
                    <Form.Label>Are you sure you want to delete?</Form.Label>
                </Form.Group>
                <Link to="/menu">
                    <Button onClick={this.props.delete} className="mr-2">Yes</Button>
                </Link>
                <Button onClick={this.props.toggleModal}>No</Button>

            </Form>
        )
    }
}

export default DeleteForm;
