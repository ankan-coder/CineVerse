import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi, { DEFAULT_IMAGES } from '../services/tmdbApi';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backdropError, setBackdropError] = useState(false);
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await tmdbApi.getMovieDetails(id);
        setMovie(movieData);
        
        const credits = await tmdbApi.getMovieCredits(id);
        setCast(credits.cast.slice(0, 10)); // Get top 10 cast members
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  // Handle image URLs with fallbacks
  const backdropUrl = movie.backdrop_path 
    ? tmdbApi.getImageUrl(movie.backdrop_path, 'original', 'backdrop') 
    : DEFAULT_IMAGES.backdrop;
  
  const posterUrl = movie.poster_path 
    ? tmdbApi.getImageUrl(movie.poster_path, 'w500', 'poster')
    : DEFAULT_IMAGES.poster;

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="movie-detail">
      <div 
        className="backdrop" 
        style={{ 
          backgroundImage: `url(${backdropError ? DEFAULT_IMAGES.backdrop : backdropUrl})` 
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-content">
        <div className="movie-poster">
          <img 
            src={posterError ? DEFAULT_IMAGES.poster : posterUrl} 
            alt={movie.title} 
            onError={() => setPosterError(true)}
          />
        </div>
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          
          <div className="movie-meta">
            <span className="release-date">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            <span className="runtime">{formatRuntime(movie.runtime)}</span>
            <span className="rating">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          
          <div className="genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre">{genre.name}</span>
            ))}
          </div>
          
          <div className="overview">
            <h3>Overview</h3>
            <p>{movie.overview || 'No overview available'}</p>
          </div>
          
          {cast.length > 0 && (
            <div className="cast">
              <h3>Cast</h3>
              <div className="cast-list">
                {cast.map(person => (
                  <div key={person.id} className="cast-member">
                    <img 
                      src={person.profile_path 
                        ? tmdbApi.getImageUrl(person.profile_path, 'w185', 'profile')
                        : DEFAULT_IMAGES.profile} 
                      alt={person.name}
                      onError={(e) => { e.target.src = DEFAULT_IMAGES.profile; }}
                    />
                    <p className="actor-name">{person.name}</p>
                    <p className="character">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 