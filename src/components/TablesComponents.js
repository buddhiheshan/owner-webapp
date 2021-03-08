import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Container, Jumbotron, Row, Col, Button, Card, Modal, ListGroup } from 'react-bootstrap'

import { getTables, deleteTable } from '../redux/actions/tableActions'

import Loading from './LoadingComponent'
import DeleteForm from './DeleteFormComponent'
import AddTableForm from './AddTableFormComponent'

function RenderTable({ table, handleDelete }) {
    return (
        <Card className="Table-card">
            <Card.Title className="Table-cardheader">
                <Row>
                    <Col md={6} className="p-0">Table Number:</Col>
                    <Col md={2} className="p-0">{table.table_number}</Col>
                    <Button value={table._id} size="sm" variant="danger" onClick={handleDelete}>Delete Table</Button>
                </Row>
            </Card.Title>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item className="Table-carddetail">
                        <Row>
                            <Col md={6} className="p-0">Junction</Col>
                            <Col className="p-0">{table.junction}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item as={Row} className="Table-carddetail">
                        <Row>
                            <Col md={6} className="p-0">Turn Direction</Col>
                            <Col className="p-0">{table.turn_direction}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

class Tables extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddTableModalOpen: false,
            isDeleteTableModalOpen: false,
            tableToDelete: null
        };

        this.toggleAddTableModal = this.toggleAddTableModal.bind(this);
        this.toggleDeleteTableModal = this.toggleDeleteTableModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    };

    componentDidMount() {
        this.props.dispatchGetTables(this.props.property.id)
    }

    toggleAddTableModal() {
        this.setState({
            isAddTableModalOpen: !this.state.isAddTableModalOpen
        });
    }

    toggleDeleteTableModal(event) {
        // console.log(event.target.value);
        if (event === undefined) {
            this.setState({
                isDeleteTableModalOpen: !this.state.isDeleteTableModalOpen
            });
        }
        else {
            this.setState({
                tableToDelete: event.target.value,
                isDeleteTableModalOpen: !this.state.isDeleteTableModalOpen
            });
        }
        // console.log(this.state);
    }

    deleteItem(event) {
        this.props.dispatchDeleteTable(this.props.property.id, this.state.tableToDelete);
        this.toggleDeleteTableModal();
    }

    render() {
        const Tables = this.props.tables.tables.map((table) => {
            return (
                <div key={table._id} className="col-6 col-md-6">
                    <RenderTable table={table} handleDelete={this.toggleDeleteTableModal} />
                </div>
            )
        });

        return (
            <React.Fragment>

                <Modal show={this.state.isAddTableModalOpen} onHide={this.toggleAddTableModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Table</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddTableForm propertyID={this.props.property.id} toggleModal={this.toggleAddTableModal} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.isDeleteTableModalOpen} onHide={this.toggleDeleteTableModal} className="Modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Table</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteForm delete={this.deleteItem} toggleModal={this.toggleDeleteTableModal} source="tableDelete" />
                    </Modal.Body>
                </Modal>

                <Jumbotron className="Jumbotron-MainPanel">
                    <Row>
                        <Col>
                            Tables
                        </Col>
                        <Button size="lg" onClick={this.toggleAddTableModal}>Add New Table</Button>
                    </Row>
                </Jumbotron>

                {this.props.tables.isLoading ? <Loading /> :
                    <Container>
                        <Row className="p-2">
                            {Tables}
                        </Row>
                    </Container>}



            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        property: state.property,
        tables: state.tables
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchGetTables: (propertyID) => dispatch(getTables(propertyID)),
    dispatchDeleteTable: (propertyID, tableID) => dispatch(deleteTable(propertyID, tableID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tables);