import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { BsCalendar, BsGeoAlt, BsPeople, BsCreditCard, BsCheckCircle, BsClock, BsXCircle } from 'react-icons/bs';
import './MyBookings.css';

const MyBookings = () => {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      setBookings([]);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <BsCheckCircle className="status-icon confirmed" />;
      case 'pending':
        return <BsClock className="status-icon pending" />;
      case 'completed':
        return <BsCheckCircle className="status-icon completed" />;
      case 'cancelled':
        return <BsXCircle className="status-icon cancelled" />;
      default:
        return <BsClock className="status-icon" />;
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  if (!user) {
    return (
      <div className="my-bookings section">
        <div className="container">
          <div className="not-logged-in">
            <h2>Please log in to view your bookings</h2>
            <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings section">
      <div className="container">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p>Manage and view all your travel reservations</p>
        </div>

        <div className="bookings-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button 
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <h3>No bookings found</h3>
            <p>Start planning your next adventure!</p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/destinations'}>
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className={`booking-card ${booking.status}`}>
                <div className="booking-image">
                  <img src={booking.destination.image} alt={booking.destination.name} />
                  <div className="booking-status">
                    {getStatusIcon(booking.status)}
                    <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                  </div>
                </div>
                <div className="booking-details">
                  <h3>{booking.destination.name}</h3>
                  <div className="booking-info">
                    <div className="info-item">
                      <BsCalendar className="icon" />
                      <span>
                        {new Date(booking.startDate).toLocaleDateString()} - 
                        {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <BsPeople className="icon" />
                      <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="info-item">
                      <BsCreditCard className="icon" />
                      <span>${booking.totalPrice}</span>
                    </div>
                  </div>
                  <div className="booking-actions">
                    <button className="btn-secondary">View Details</button>
                    {booking.status === 'confirmed' && (
                      <button className="btn-danger">Cancel Booking</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
