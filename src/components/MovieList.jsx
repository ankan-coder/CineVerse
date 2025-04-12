import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import '../styles/MovieList.css';

const MovieList = ({ title, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchMovies]);

  if (loading) {
    return <div className="section-loading">
      <LoadingSpinner message={`Loading ${title}...`} />
    </div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="no-results">No movies found</div>;
  }

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">{title}</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList; 