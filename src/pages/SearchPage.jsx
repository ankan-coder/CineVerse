import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import tmdbApi from '../services/tmdbApi';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query);

  const fetchSearchResults = useCallback(() => {
    return tmdbApi.searchMovies(decodedQuery);
  }, [decodedQuery]);

  return (
    <div className="search-page">
      <h1 className="search-title">
        Search Results for "<span className="search-query">{decodedQuery}</span>"
      </h1>
      <MovieList title="" fetchMovies={fetchSearchResults} />
    </div>
  );
};

export default SearchPage; 