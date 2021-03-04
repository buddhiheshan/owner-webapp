import React, { Component } from 'react'

import { Form, Button, Image } from 'react-bootstrap';

class EditImageForm extends Component {
    
    render() {
        return (
            <Form>

                <Form.Group>
                    <Form.Label>
                        Current Image
                    </Form.Label>
                    <Image src={this.props.imgURL} rounded fluid/>
                </Form.Group>

                <Form.Group>
                    <Form.File id="image" label="Select an image to upload"/>
                </Form.Group>

                <Form.Group className="offset-4">
                    <Button onClick={this.handleUpload}>Upload</Button>
                </Form.Group>

            </Form>
        )
    }
}

export default EditImageForm;
