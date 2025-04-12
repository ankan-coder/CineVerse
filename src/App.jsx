import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/movies/:category" element={<CategoryPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
