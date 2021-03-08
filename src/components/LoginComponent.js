import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { connect } from 'react-redux';

import { login } from '../redux/actions/userActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.props.dispatchLogin(this.state.mobile, this.state.password);
        event.preventDefault()
    }

    render() {
        return (
            <Container className="LoginBackgrond">
                <Form className="Login" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="mobile">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="number" name="mobile" placeholder="Enter mobile number" value={this.state.mobile} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchLogin: (mobile, password) => dispatch(login(mobile, password))
});

export default connect(null, mapDispatchToProps)(Login);