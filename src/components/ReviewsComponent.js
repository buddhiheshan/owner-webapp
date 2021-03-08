import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { MdStar } from 'react-icons/md'

import Loading from './LoadingComponent';

import { getReviews } from '../redux/actions/reviewsActions';



const RenderStars = ({ count }) => {
    const stars = [];

    for (let i = 0; i < count; i++) {
        stars.push(<MdStar key={i} color="red" />)
    }
    return (
        <div>
            {stars}
        </div>
    )
}



class Reviews extends Component {

    componentDidMount() {
        this.props.dispatchGetReviews(this.props.selectedItem._id);
    }

    render() {

        const reviews = this.props.reviews.reviews.map((review) => (
            <ListGroup.Item key={review._id} className="Review">
                {review.comment}<br />
                <RenderStars count={review.stars} />
            </ListGroup.Item>
        ))

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>Reviews</Col>
                    </Row>
                    <Row >
                        <Col>
                            {
                                this.props.reviews.isLoading ? <Loading /> :
                                    <ListGroup>
                                        {reviews}
                                    </ListGroup>
                            }
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedItem: state.items.selectedItem,
    reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({
    dispatchGetReviews: (itemID) => dispatch(getReviews(itemID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
