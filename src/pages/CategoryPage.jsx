import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import tmdbApi from '../services/tmdbApi';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryTitles = {
    popular: 'Popular Movies',
    top_rated: 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    now_playing: 'Now Playing'
  };

  const fetchMovies = useCallback(() => {
    return tmdbApi.getMoviesByCategory(category);
  }, [category]);

  return (
    <div className="category-page">
      <h1 className="category-title">{categoryTitles[category] || 'Movies'}</h1>
      <MovieList title="" fetchMovies={fetchMovies} />
    </div>
  );
};

export default CategoryPage; 