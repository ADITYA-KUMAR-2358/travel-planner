import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinations, setFilters, clearFilters } from '../../store/slices/destinationsSlice';
import DestinationCard from '../../components/DestinationCard/DestinationCard';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import './DestinationsPage.css';

const DestinationsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, filters, pagination } = useSelector((state) => state.destinations);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchDestinations(filters));
  }, [dispatch, filters]);

  const handleSearch = () => {
    dispatch(setFilters(localFilters));
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      priceMin: 0,
      priceMax: 10000
    };
    setLocalFilters(clearedFilters);
    dispatch(clearFilters());
  };

  return (
    <div className="destinations-page section">
      <div className="container">
        <div className="destinations-header">
          <h1>Explore Destinations</h1>
          <p>Discover your next adventure from our curated collection</p>
        </div>

        <SearchFilters
          filters={localFilters}
          setFilters={setLocalFilters}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading destinations...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="no-results">
            <h3>No destinations found</h3>
            <p>Try adjusting your filters</p>
            <button className="btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="destinations-grid">
              {items.map((destination) => (
                <DestinationCard key={destination._id} destination={destination} />
              ))}
            </div>

            {pagination.pages > 1 && (
              <div className="pagination">
                <p>
                  Page {pagination.page} of {pagination.pages} ({pagination.total} destinations)
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
