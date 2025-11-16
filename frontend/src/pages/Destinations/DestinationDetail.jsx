import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  BsGeoAlt, BsClock, BsPeople, BsStar, BsStarFill, BsArrowLeft 
} from 'react-icons/bs';
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinationDetails();
    fetchReviews();
  }, [id]);

  const fetchDestinationDetails = () => {
    const mockDestination = {
      id: id,
      name: 'Paris, France',
      description: 'Experience the magic of the City of Light. From the iconic Eiffel Tower to charming cafes and world-class museums, Paris offers an unforgettable blend of culture, history, and romance.',
      image: '/static/media/img (1).jpg',
      price: 1200,
      duration: '7 days',
      location: { lat: 48.8566, lng: 2.3522 },
      rating: 4.8,
      totalReviews: 156,
      highlights: [
        'Visit the Eiffel Tower and Louvre Museum',
        'Stroll along the Champs-Élysées',
        'Explore Montmartre and Sacré-Cœur',
        'Enjoy authentic French cuisine',
        'Cruise along the Seine River'
      ],
      includes: ['Accommodation', 'Breakfast', 'City tours', 'Airport transfer']
    };
    
    setDestination(mockDestination);
    setLoading(false);
  };

  const fetchReviews = () => {
    const mockReviews = [
      {
        id: 1,
        user: 'Sarah Johnson',
        rating: 5,
        date: '2025-01-10',
        comment: 'Absolutely stunning! Paris exceeded all my expectations. The tour was well-organized and our guide was fantastic.'
      },
      {
        id: 2,
        user: 'Michael Chen',
        rating: 4,
        date: '2025-01-05',
        comment: 'Great experience overall. Would have loved more free time to explore on our own, but the planned activities were excellent.'
      },
      {
        id: 3,
        user: 'Emma Williams',
        rating: 5,
        date: '2024-12-28',
        comment: 'A dream come true! Every moment was magical. The accommodations were comfortable and the food was incredible.'
      }
    ];
    setReviews(mockReviews);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to submit a review');
      navigate('/login');
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    const review = {
      id: Date.now(),
      user: user.name || 'Anonymous',
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    toast.success('Review submitted successfully!');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? 
        <BsStarFill key={index} className="star filled" /> : 
        <BsStar key={index} className="star" />
    ));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading destination details...</p>
      </div>
    );
  }

  return (
    <div className="destination-detail section">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/destinations')}>
          <BsArrowLeft /> Back to Destinations
        </button>

        <div className="detail-hero">
          <img src={destination.image} alt={destination.name} />
          <div className="hero-overlay">
            <h1>{destination.name}</h1>
            <div className="rating-badge">
              {renderStars(Math.round(destination.rating))}
              <span>{destination.rating} ({destination.totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="main-content">
            <section className="info-section">
              <h2>About This Destination</h2>
              <p>{destination.description}</p>
            </section>

            <section className="info-section">
              <h2>Highlights</h2>
              <ul className="highlights-list">
                {destination.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section className="info-section map-section">
              <h2><BsGeoAlt className="icon" /> Location</h2>
              <div className="map-container">
                <div className="map-placeholder">
                  <BsGeoAlt className="map-icon" />
                  <h3>{destination.name}</h3>
                  <p>Coordinates: {destination.location.lat}, {destination.location.lng}</p>
                  <a 
                    href={`https://www.google.com/maps?q=${destination.location.lat},${destination.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-map"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </section>

            <section className="info-section reviews-section">
              <h2><BsStar className="icon" /> Reviews ({reviews.length})</h2>
              
              {user && (
                <form className="review-form" onSubmit={handleSubmitReview}>
                  <h3>Write a Review</h3>
                  <div className="rating-input">
                    <label>Your Rating:</label>
                    <div className="stars-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <BsStarFill
                          key={star}
                          className={`star ${star <= newReview.rating ? 'filled' : ''}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        />
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Share your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows="4"
                  />
                  <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
              )}

              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div>
                        <h4>{review.user}</h4>
                        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="sidebar">
            <div className="booking-card">
              <div className="price">
                <span className="price-label">From</span>
                <span className="price-value">${destination.price}</span>
                <span className="price-per">per person</span>
              </div>

              <div className="booking-info">
                <div className="info-item">
                  <BsClock className="icon" />
                  <span>{destination.duration}</span>
                </div>
                <div className="info-item">
                  <BsPeople className="icon" />
                  <span>Group tours available</span>
                </div>
              </div>

              <button className="btn btn-book" onClick={() => toast.info('Booking feature coming soon!')}>
                Book Now
              </button>

              <div className="includes">
                <h4>What's Included</h4>
                <ul>
                  {destination.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
