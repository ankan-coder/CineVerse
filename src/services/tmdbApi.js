import axios from 'axios';

const API_KEY = '718c12ba264810ca1041b0c08c67184f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Default images for fallbacks
export const DEFAULT_IMAGES = {
  poster: 'https://placehold.co/500x750/222222/FFFFFF?text=No+Poster+Available',
  backdrop: 'https://placehold.co/1920x1080/222222/FFFFFF?text=No+Backdrop+Available',
  profile: 'https://placehold.co/185x278/222222/FFFFFF?text=No+Profile+Available'
};

const tmdbApi = {
  // Get trending movies
  getTrending: async (timeWindow = 'day', page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${page}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get movies by category (popular, top_rated, upcoming, now_playing)
  getMoviesByCategory: async (category, page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`
      );
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      throw error;
    }
  },

  // Search for movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for movie ${movieId}:`, error);
      throw error;
    }
  },

  // Get movie credits (cast and crew)
  getMovieCredits: async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching credits for movie ${movieId}:`, error);
      throw error;
    }
  },
  
  // Get movies by genre
  getMoviesByGenre: async (genreId, page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
      );
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
      throw error;
    }
  },
  
  // Get movie genres list
  getGenres: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },
  
  // Get full image URL
  getImageUrl: (path, size = 'original', type = 'poster') => {
    if (!path) {
      return type === 'poster' 
        ? DEFAULT_IMAGES.poster 
        : type === 'backdrop' 
          ? DEFAULT_IMAGES.backdrop 
          : DEFAULT_IMAGES.profile;
    }
    
    // If path is already a complete URL (starts with http), return it directly
    if (path.startsWith('http')) {
      return path;
    }
    
    // Default sizes based on image type
    const defaultSizes = {
      poster: 'w500',
      backdrop: 'w1280',
      profile: 'w185'
    };
    
    const imageSize = size || defaultSizes[type] || 'original';
    return `${IMAGE_BASE_URL}${imageSize}${path}`;
  }
};

export default tmdbApi; 