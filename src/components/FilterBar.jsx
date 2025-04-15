import React from 'react';
import './FilterBar.css';

const categories = [
  'general',
  'business',
  'technology',
  'sports',
  'health',
  'science',
  'entertainment',
];

const FilterBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
