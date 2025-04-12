import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DEFAULT_IMAGES } from '../services/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';
import PageTransition from '../components/PageTransition';
import '../styles/MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posterError, setPosterError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);

  useEffect(() => {
    // Reset errors when ID changes
    setPosterError(false);
    setBackdropError(false);
    
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=718c12ba264810ca1041b0c08c67184f&language=en-US`
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=718c12ba264810ca1041b0c08c67184f&language=en-US`
        );
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const getDirector = () => {
    if (!credits?.crew) return 'Unknown';
    const director = credits.crew.find((person) => person.job === 'Director');
    return director ? director.name : 'Unknown';
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTopCast = () => {
    if (!credits?.cast) return [];
    return credits.cast.slice(0, 5);
  };

  if (loading) {
    return <div className="full-page-loading">
      <LoadingSpinner message="Loading movie details..." />
    </div>;
  }

  if (!movie) {
    return <div className="error">Movie information could not be found</div>;
  }

  // Prepare image URLs with fallbacks
  const posterUrl = movie.poster_path && !posterError
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : DEFAULT_IMAGES.poster;
    
  const backdropUrl = movie.backdrop_path && !backdropError
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : DEFAULT_IMAGES.backdrop;

  return (
    <PageTransition>
      <div className="movie-details-container">
        <div 
          className="backdrop" 
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <img 
            src={backdropUrl} 
            alt=""
            style={{ display: 'none' }} 
            onError={() => setBackdropError(true)}
          />
        </div>
        <div className="movie-details-content">
          <div className="poster-container">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="poster" 
              onError={() => setPosterError(true)}
            />
          </div>
          <div className="details">
            <h1 className="title">{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
            
            <div className="rating-runtime">
              <span className="rating">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
              {movie.runtime > 0 && <span className="runtime">🕒 {formatRuntime(movie.runtime)}</span>}
            </div>
            
            <p className="release-date">📅 Released: {new Date(movie.release_date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            
            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <h3>Overview</h3>
            <p className="overview">{movie.overview || 'No overview available.'}</p>
            
            <div className="credits">
              <p><strong>Director:</strong> {getDirector()}</p>
              {movie.budget > 0 && (
                <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
              )}
              {movie.revenue > 0 && (
                <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
              )}
              
              <h3>Top Cast</h3>
              <div className="cast-list">
                {getTopCast().map((actor) => (
                  <div key={actor.id} className="cast-item">
                    <img 
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : DEFAULT_IMAGES.profile} 
                      alt={actor.name}
                      onError={(e) => { e.target.src = DEFAULT_IMAGES.profile; }}
                    />
                    <p>{actor.name}</p>
                    <p className="character">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MovieDetailsPage; 