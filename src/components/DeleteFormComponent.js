import React, { Component } from 'react'

import { Form, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const RenderYesButton = (props) => {
    switch (props.source) {
        case "itemDelete":
            return (
                <Link to="/menu">
                    <Button onClick={props.delete} className="mr-2">Yes</Button>
                </Link>
            )
        case "tableDelete":
            return (
                <Button onClick={props.delete} className="mr-2">Yes</Button>
            )

        default:
            break;
    }
}

class DeleteForm extends Component {

    render() {
        return (
            <Form>

                <Form.Group>
                    <Form.Label>Are you sure you want to delete?</Form.Label>
                </Form.Group>
                <RenderYesButton source={this.props.source} delete={this.props.delete}/>

                <Button onClick={this.props.toggleModal}>No</Button>

            </Form>
        )
    }
}

export default DeleteForm;
