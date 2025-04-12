# CineVerse - Discover Amazing Movies

A React movie application built with Vite that uses The Movie Database (TMDB) API to display information about movies.

## Features

- Browse trending, popular, and top-rated movies
- View detailed information about movies including cast, crew, and ratings
- Search for movies by title
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- TMDB API key (get one at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd movie-app
```

2. Install dependencies
```
npm install
```

3. Set up your TMDB API key

Open `src/services/tmdbApi.js` and replace `'YOUR_API_KEY'` with your actual TMDB API key:

```javascript
const TMDB_API_KEY = 'your_actual_api_key_here';
```

4. Start the development server
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components` - Reusable UI components
- `src/pages` - Page components for different routes
- `src/services` - API services and utilities
- `src/styles` - CSS files for components and pages

## Built With

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [React Router](https://reactrouter.com/) - Routing library
- [Axios](https://axios-http.com/) - HTTP client
- [TMDB API](https://developers.themoviedb.org/3) - Movie database API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Movie Database for providing the API
- All the open-source libraries used in this project
