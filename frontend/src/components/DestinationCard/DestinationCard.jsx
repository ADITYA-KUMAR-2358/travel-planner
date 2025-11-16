import { Link } from 'react-router-dom';
import { HiLocationMarker } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import './DestinationCard.css';

const DestinationCard = ({ destination }) => {
  const { _id, name, location, shortDescription, price, duration, images, rating } = destination;
  const primaryImage = images?.find(img => img.isPrimary)?.url || images?.[0]?.url || '/placeholder.jpg';

  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={primaryImage} alt={name} />
        <div className="card-overlay">
          <Link to={`/destinations/${_id}`} className="btn">
            View Details
          </Link>
        </div>
      </div>

      <div className="card-content">
        <div className="card-location">
          <HiLocationMarker className="icon" />
          <span>{location.city}, {location.country}</span>
        </div>

        <h3>{name}</h3>
        <p className="card-description">{shortDescription}</p>

        <div className="card-footer">
          <div className="card-info">
            <div className="duration">{duration}</div>
            {rating?.average > 0 && (
              <div className="rating">
                <BsStarFill className="star-icon" />
                <span>{rating.average.toFixed(1)} ({rating.count})</span>
              </div>
            )}
          </div>

          <div className="card-price">
            <span className="price-from">From</span>
            <span className="price-amount">${price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
