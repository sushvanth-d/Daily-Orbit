import React, { useEffect, useState } from 'react';
import './Home.css';  // Import Home.css
import FilterBar from '../components/FilterBar';
import NewsCard from '../components/NewsCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // To handle errors

  const apiKey = '4c8afeefd2d2406ab688b81559fe918b';  // Your API Key

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(false); // Reset error state on new fetch

      const requestURL = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&page=${page}&pageSize=15&apiKey=${apiKey}`;

      console.log("Fetching data from:", requestURL);  // Log the request URL

      try {
        const res = await fetch(requestURL);
        const data = await res.json();
        
        if (data.status !== 'ok' || !data.articles || data.articles.length === 0) {
          console.error("No articles found or error occurred:", data);
        }

        if (page === 1) {
          setArticles(data.articles);
        } else {
          setArticles((prev) => [...prev, ...data.articles]);
        }

        setTotalResults(data.totalResults);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, searchTerm, page]);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="home-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          There was an error loading the news. Please try again later.
        </p>
      )}

      {filteredArticles.length === 0 && !loading && !error && (
        <p>No articles found for "{searchTerm}". Try searching for something else!</p>
      )}

      <div className="news-grid">
        {filteredArticles.length > 0 && filteredArticles.map((article, index) => (
          <div className="news-card" key={index}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>

      {loading && <p>Loading more articles...</p>}

      {!loading && filteredArticles.length < totalResults && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
