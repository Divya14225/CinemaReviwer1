import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './reviews.css';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    const [showReviews, setShowReviews] = useState(false);
    const { imdbId, flag } = useParams();

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current.value;

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/reviews/${imdbId}`, { reviewBody: rev });
            const newReview = { _id: response.data._id, body: rev };
            setReviews(prevReviews => [...prevReviews, newReview]);
            revText.current.value = ""; // Clear textarea
        } catch (err) {
            console.error("Failed to add review:", err);
        }
    };

    useEffect(() => {
        if (showReviews) {
            const getReviews = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/reviews/${imdbId}`);
                    setReviews(response.data); // Update reviews state
                } catch (err) {
                    console.error("Failed to fetch reviews:", err);
                }
            };
            getReviews(); 
        }
    }, [imdbId, showReviews, setReviews]);

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    {flag === "true" ? (
                        <ReviewForm handleSubmit={addReview} revText={revText} flag={flag} labelText="Write a Review?" />
                    ) : (
                        <>
                            <Button onClick={() => setShowReviews(!showReviews)}>
                                {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                            </Button>
                            {showReviews && (
                                <div>
                                    <p>Reviews:</p>
                                    <ul>
                                        {reviews.length > 0 ? (
                                            reviews.map((review, index) => {
                                                let reviewText;
                                                try {
                                                    const parsedReview = typeof review === 'string' ? JSON.parse(review) : review;
                                                    reviewText = parsedReview.reviewBody || review.body || review;
                                                } catch (e) {
                                                    reviewText = review.body || review;
                                                }

                                                return <li key={index}>{reviewText}</li>;
                                            })
                                        ) : (
                                            <p>No reviews available</p>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
