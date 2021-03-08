import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { MdRestaurantMenu, MdSupervisorAccount, MdStoreMallDirectory, MdReorder} from 'react-icons/md';
import { GiTabletopPlayers } from 'react-icons/gi'; 

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        this.props.dispatchLogout();
    };

    render() {
        return (
            <Navbar bg="light" expand="sm" className="NavBar">
                <Navbar.Brand><NavLink className="Navlink nav-link NavbarBrand" to='/menu'> Welcome!</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="Navlink nav-link" to='/menu'><MdRestaurantMenu size="2em"/> Menu</NavLink>
                        {/* <NavLink className="Navlink nav-link" to='/operators'><MdSupervisorAccount size="2em"/> Operators</NavLink> */}
                        <NavLink className="Navlink nav-link" to='/property'><MdStoreMallDirectory size="2em"/> Property</NavLink>
                        <NavLink className="Navlink nav-link" to='/orders'><MdReorder size="2em"/> Orders</NavLink>
                        <NavLink className="Navlink nav-link" to='/tables'><GiTabletopPlayers size="2em"/> Tables</NavLink>
                    </Nav>
                    <Button variant="primary" onClick={this.handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchLogout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(NavBar);
