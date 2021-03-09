import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { postItem } from '../redux/actions/itemActions';
import { connect } from 'react-redux';

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class AddItemForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "",
            portions: [
            ],
            ingredients: [
            ]

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.removePortion = this.removePortion.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAddItem(event) {
        console.log(this.state);
        this.props.toggleModal();
        this.props.dispatchPostItems(this.props.propertyID, this.state);
        event.preventDefault();
    }

    addIngredient() {

        const ingredients = [...this.state.ingredients, this.ingredient.value];
        this.setState({ ...this.state, ingredients });
        this.ingredient.value = "";
    }

    removeIngredient(e) {
        const ingredients = this.state.ingredients.filter((ingredient) => ingredient !== e.target.value);

        this.setState({
            ...this.state,
            ingredients
        })
    }

    addPortion() {
        const portion = {
            name: this.portion_name.value,
            price: this.portion_price.value
        }
        const portions = [...this.state.portions, portion];

        this.setState({ ...this.state, portions });
        this.portion_name.value = "";
        this.portion_price.value = "";
    }

    removePortion(e) {
        const portions = this.state.portions.filter((portion) => portion.name !== e.target.value);
        this.setState({
            ...this.state,
            portions
        })
    }

    render() {
        return (
            <Form>
                <Form.Group as={Row} controlId="name">
                    <Col sm="4">
                        <Form.Label column >Item Name</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="Enter Item Name" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="category">
                    <Col sm="4">
                        <Form.Label column >Item Category</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control as="select" name="category" value={this.state.category} onChange={this.handleChange}>
                            <option>Noodles</option>
                            <option>Rice</option>
                            <option>Soup</option>
                            <option>Drinks</option>
                        </Form.Control>
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Col sm="4">
                        <Form.Label column >Ingredients</Form.Label>
                    </Col>
                    <Col sm="8">
                        {
                            this.state.ingredients.map((ingredient, i) => (
                                <Form.Group key={i} className="row">
                                    <div className="col-8">
                                        {ingredient}
                                    </div>
                                    <Button type="button" value={ingredient} onClick={this.removeIngredient} className="btn btn-primary col-2 ml-2"><strong>-</strong></Button>
                                </Form.Group>
                            ))
                        }
                        <Form.Group as={Row}>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Enter Ingredient" name="ingredient" ref={(input) => this.ingredient = input} />
                            </Col>
                            <Button type="button" onClick={() => { this.addIngredient() }} className="btn btn-primary col-2 ml-2"><strong>+</strong></Button>
                        </Form.Group >
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm="4">
                        <Form.Label column >Portion</Form.Label>
                    </Col>
                    <Col sm="8">
                        {
                            this.state.portions.map((portion, i) => (
                                <Form.Group key={i} className="row">
                                    <div className="col-4">
                                        {portion.name}
                                    </div>
                                    <div className="col-4">
                                        {portion.price}
                                    </div>
                                    <Button type="button" value={portion.name} onClick={this.removePortion} className="btn btn-primary col-2 ml-2"><strong>-</strong></Button>
                                </Form.Group>
                            ))
                        }
                        <Form.Group as={Row}>
                            <Col sm="4">
                                <Form.Control type="text" placeholder="Name" name="portion_name" ref={(input) => this.portion_name = input} />
                            </Col>
                            <Col sm="4">
                                <Form.Control type="number" placeholder="Price" name="portion_price" ref={(input) => this.portion_price = input} />
                            </Col>
                            <Button type="button" onClick={() => { this.addPortion() }} className="btn btn-primary col-2 ml-2"><strong>+</strong></Button>
                        </Form.Group >
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="description">
                    <Col sm="4">
                        <Form.Label column >Description</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" placeholder="Enter Item Description" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Col>
                </Form.Group>


                <Form.Group className="offset-4">
                    <Button onClick={this.handleAddItem}>Add New Item</Button>
                </Form.Group>
            </Form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    dispatchPostItems: (propertyID, item) => dispatch(postItem(propertyID, item))
});

export default connect(null, mapDispatchToProps)(AddItemForm);

