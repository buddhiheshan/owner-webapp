import React, { Component } from 'react';
import { Jumbotron, Breadcrumb, Button, Container, Row, Col, Modal, Image, ListGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getItemDetail, deleteItem } from '../redux/actions/itemActions';

import Loading from './LoadingComponent';
import DeleteForm from './DeleteFormComponent';
import EditImageForm from './EditImageFormComponent';
import EditItemForm from './EditItemFormComponent';
import Reviews from './ReviewsComponent';
// import { getReviews } from '../store/actions/reviewActions';

function RenderItemDetails({ item }) {
    const RequiredDetails = {
        "Name": item.name,
        "Category": item.category,
        "Description": item.description,
        "Status": item.status
    }

    return (
        <ListGroup>
            {
                Object.keys(RequiredDetails).map((key, i) => {
                    return (
                        <ListGroup.Item key={i}>
                            <Row>
                                <Col md={4}>
                                    {key}
                                </Col>
                                <Col>
                                    {RequiredDetails[key]}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })
            }
            <RenderIngredients ingredients={item.ingredients} />
            <RenderPortions portions={item.portions} />
        </ListGroup>
    )
}

function RenderIngredients({ ingredients }) {
    return (
        <ListGroup.Item>
            <Row>
                <Col md={4}>
                    Ingredients
                </Col>
                <Col>
                    <ul>
                        {
                            ingredients.map((ingredient, i) => {
                                return (
                                    <li key={i}>{ingredient}</li>
                                )
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

function RenderPortions({ portions }) {
    return (
        <ListGroup.Item>
            <Row>
                <Col md={4}>
                    Portions
                </Col>
                <Col>
                    <ul>
                        {
                            portions.map((portion, i) => {
                                return (
                                    <li key={i}>
                                        <Row>
                                            <Col md={6}>
                                                {portion.name}
                                            </Col>
                                            <Col md={6}>
                                                {portion.price}
                                            </Col>
                                        </Row>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

class ItemDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemID: this.props.match.params.itemID,
            isEditImageModalOpen: false,
            isEditItemModalOpen: false,
            isDeleteItemModalOpen: false
        };

        this.toggleEditImageModal = this.toggleEditImageModal.bind(this);
        this.toggleEditItemModal = this.toggleEditItemModal.bind(this);
        this.toggleDeleteItemModal = this.toggleDeleteItemModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    };

    componentDidMount() {
        this.props.dispatchGetItemDetail(this.state.itemID);
    }

    deleteItem() {
        this.props.dispatchDeleteItem(this.props.items.selectedItem._id);
        this.toggleDeleteItemModal();
    }

    toggleEditImageModal() {
        this.setState({
            isEditImageModalOpen: !this.state.isEditImageModalOpen
        });
    }

    toggleEditItemModal() {
        this.setState({
            isEditItemModalOpen: !this.state.isEditItemModalOpen
        });
    }

    toggleDeleteItemModal() {
        this.setState({
            isDeleteItemModalOpen: !this.state.isDeleteItemModalOpen
        });
    }

    render() {

        if (!this.props.items.selectedItem) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        // else
        return (

            <React.Fragment>

                <Modal show={this.state.isEditImageModalOpen} onHide={this.toggleEditImageModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Item Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditImageForm imgURL={this.props.items.selectedItem.imgUrl} toggleModal={this.toggleEditImageModal} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.isEditItemModalOpen} onHide={this.toggleEditItemModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Item Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditItemForm toggleModal={this.toggleEditItemModal} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.isDeleteItemModalOpen} onHide={this.toggleDeleteItemModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteForm delete={this.deleteItem} toggleModal={this.toggleDeleteItemModal} />
                    </Modal.Body>
                </Modal>

                <Jumbotron fluid className="Jumbotron-MainPanel">
                    <Row>
                        <Col>
                            {this.props.items.selectedItem.name}
                        </Col>
                        <Button size="lg" onClick={this.toggleEditImageModal} className="mr-3">Edit Item Image</Button>
                        <Button size="lg" onClick={this.toggleEditItemModal} className="mr-3">Edit Item</Button>
                        <Button size="lg" onClick={this.toggleDeleteItemModal} className="mr-3">Delete Item</Button>
                    </Row>
                </Jumbotron>

                <Container fluid>
                    <Row>
                        <Breadcrumb className='m-3'>
                            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/menu" }}>Menu</Breadcrumb.Item>
                            <Breadcrumb.Item active>{this.props.items.selectedItem.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="ItemDetails">
                        <Col md={6}>
                            <Image rounded src={this.props.items.selectedItem.imgUrl} width="100%" alt="food item" />
                        </Col>
                        <Col>
                            <RenderItemDetails item={this.props.items.selectedItem} />
                        </Col>
                    </Row>
                    <Reviews />
                </Container>

            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    items: state.items,
    // reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({
    dispatchGetItemDetail: (itemID) => dispatch(getItemDetail(itemID)),
    dispatchDeleteItem: (itemID) => dispatch(deleteItem(itemID))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));