import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Jumbotron, Card, Container, Row, Modal, Button, Col } from 'react-bootstrap';

import Loading from './LoadingComponent';
import AddItemForm from './AddItemFormComponent';

import { getItems } from '../redux/actions/itemActions';

function RenderMenuItem({ item }) {
    return (
        <Card>
            <Link to={`/menu/${item._id}`}>
                <Card.Img className="Item-img" src={item.imgUrl} alt={item.name} />
                <Card.ImgOverlay className="Item-overlay">
                    <Card.Title className="Item-title">{item.name}</Card.Title>
                </Card.ImgOverlay>
            </Link>
        </Card>
    );
};

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    };

    componentDidMount() {
        this.props.dispatchGetItems(this.props.property.id)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        const MenuItems = this.props.items.items.map((item) => {
            return (
                <div key={item._id} className="col-6 col-md-3 Food-item">
                    <RenderMenuItem item={item} />
                </div>
            )
        });

        return (
            <React.Fragment>

                <Modal show={this.state.isModalOpen} onHide={this.toggleModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddItemForm propertyID={this.props.property.id} toggleModal={this.toggleModal} />
                    </Modal.Body>
                </Modal>

                <Jumbotron className="Jumbotron-MainPanel">
                    <Row>
                        <Col>
                            Menu
                            </Col>
                        <Button className="btn-lg" onClick={this.toggleModal}>Add New Item</Button>
                    </Row>
                </Jumbotron>

                {this.props.items.isLoading ? <Loading /> :
                    <Container>
                        <Row className="p-2">
                            {MenuItems}
                        </Row>
                    </Container>}

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        items: state.items
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetItems: (propertyID) => dispatch(getItems(propertyID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);