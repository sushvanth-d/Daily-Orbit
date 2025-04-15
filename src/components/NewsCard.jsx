import React, { useState } from 'react';
import './NewsCard.css'; // Import the NewsCard styles

const NewsCard = ({ article }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true); // Mark image as loaded
  };

  return (
    <div className={`news-card ${isImageLoaded ? 'loaded' : 'loading'}`}>
      {/* Image with a fallback if no image is provided */}
      <img 
        src={article.image || 'path_to_fallback_image.jpg'} 
        alt={article.title} 
        onLoad={handleImageLoad} 
        loading="lazy" // Lazy loading the image
      />

      {/* Display loading spinner or placeholder until image is loaded */}
      {!isImageLoaded && <div className="image-placeholder"></div>}

      <div className="news-card-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </div>
  );
};

export default NewsCard;
