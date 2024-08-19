import axios from 'axios';

const ReviewList = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await axios.get(`/reviews/${movieId}`);
                console.log("API Response:", response.data); // Debugging line
                if (Array.isArray(response.data)) {
                    setReviews(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        };
        getReviews();
    }, [movieId]);

    return (
        <div>
            <p>Reviews:</p>
            <ul className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review._id} className="review-item">{review.body}</li>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </ul>
        </div>
    );
};

export default ReviewList;
