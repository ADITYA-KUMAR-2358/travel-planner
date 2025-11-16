import { useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import './SearchFilters.css';

const SearchFilters = ({ filters, setFilters, onSearch, onClear }) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'beach', label: 'Beach' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'city', label: 'City' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'budget', label: 'Budget' }
  ];

  const handleInputChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="search-filters">
      <div className="search-bar">
        <div className="search-input-group">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        <button className="btn search-btn" onClick={onSearch}>
          Search
        </button>
        <button 
          className="btn filter-toggle-btn" 
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'More Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range: ${filters.priceMin} - ${filters.priceMax}</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => handleInputChange('priceMin', e.target.value)}
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => handleInputChange('priceMax', e.target.value)}
                min="0"
              />
            </div>
          </div>

          <button className="btn clear-btn" onClick={onClear}>
            <BsX /> Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
