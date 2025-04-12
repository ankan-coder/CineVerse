import { useCallback, useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import tmdbApi from '../services/tmdbApi';
import '../styles/HomePage.css';

const HomePage = () => {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const trendingMovies = await tmdbApi.getTrending('day');
        if (trendingMovies && trendingMovies.length > 0) {
          // Get a random movie from the top 5 trending for the hero section
          const randomIndex = Math.floor(Math.random() * Math.min(5, trendingMovies.length));
          setHeroMovie(trendingMovies[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching hero movie:', error);
      }
    };
    
    fetchHeroMovie();
  }, []);

  const fetchTrending = useCallback(() => {
    return tmdbApi.getTrending('day');
  }, []);

  const fetchPopular = useCallback(() => {
    return tmdbApi.getMoviesByCategory('popular');
  }, []);

  const fetchTopRated = useCallback(() => {
    return tmdbApi.getMoviesByCategory('top_rated');
  }, []);

  const heroBackdropUrl = heroMovie 
    ? tmdbApi.getImageUrl(heroMovie.backdrop_path, 'original', 'backdrop')
    : null;

  const heroStyle = {
    backgroundImage: heroBackdropUrl 
      ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${heroBackdropUrl}')`
      : `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${tmdbApi.getImageUrl(null, 'original', 'backdrop')}')`
  };

  return (
    <div className="home-page">
      <div className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <div className="hero-logo">
            <span className="logo-first">Cine</span><span className="logo-last">Verse</span>
          </div>
          <h1>Discover Amazing Movies</h1>
          <p>Your ultimate destination for exploring the world of cinema</p>
          {heroMovie && (
            <div className="featured-movie">
              <span className="featured-label">Featured:</span>
              <span className="featured-title">{heroMovie.title}</span>
            </div>
          )}
        </div>
      </div>

      <div className="movie-sections">
        <MovieList title="Trending Today" fetchMovies={fetchTrending} />
        <MovieList title="Popular Movies" fetchMovies={fetchPopular} />
        <MovieList title="Top Rated" fetchMovies={fetchTopRated} />
      </div>
    </div>
  );
};

export default HomePage; 