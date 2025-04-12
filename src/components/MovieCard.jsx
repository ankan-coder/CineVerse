import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tmdbApi, { DEFAULT_IMAGES } from '../services/tmdbApi';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const [imgError, setImgError] = useState(false);
  
  // Use DEFAULT_IMAGES.poster as fallback if no poster_path exists
  const posterUrl = movie.poster_path 
    ? tmdbApi.getImageUrl(movie.poster_path, 'w500', 'poster')
    : DEFAULT_IMAGES.poster;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-poster">
          <img
            src={imgError ? DEFAULT_IMAGES.poster : posterUrl}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-rating">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
            <span className="movie-year">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard; 