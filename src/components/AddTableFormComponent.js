import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { postTable } from '../redux/actions/tableActions';
import { connect } from 'react-redux';

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class AddTableForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            table_number: "",
            junction: "",
            turn_direction: "left"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddTable = this.handleAddTable.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAddTable(event) {
        console.log("adding table");
        console.log(this.state)
        this.props.toggleModal();
        this.props.dispatchPostTable(this.props.propertyID, this.state);
        event.preventDefault();
    }

    render() {
        return (
            <Form>
                <Form.Group as={Row} controlId="table_number">
                    <Col sm="4">
                        <Form.Label column >Table No</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="number" placeholder="Enter Table No" name="table_number" value={this.state.table_number} onChange={this.handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="junction">
                    <Col sm="4">
                        <Form.Label column >Junction No</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="number" placeholder="Enter Junction No" name="junction" value={this.state.junction} onChange={this.handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="turn_direction">
                    <Col sm="4">
                        <Form.Label>Turn Direction</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control as="select" value={this.state.turn_direction} name="turn_direction" onChange={this.handleChange}>
                            <option>left</option>
                            <option>right</option>
                        </Form.Control>
                    </Col>


                </Form.Group>




                <Form.Group className="offset-4">
                    <Button onClick={this.handleAddTable}>Add New Table</Button>
                </Form.Group>
            </Form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    dispatchPostTable: (propertyID, table) => dispatch(postTable(propertyID, table))
});

export default connect(null, mapDispatchToProps)(AddTableForm);

