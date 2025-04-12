import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
            <span className="logo-first">Cine</span><span className="logo-last">Verse</span>
          </Link>
          
          <div className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={`nav-links ${mobileMenuOpen ? 'nav-active' : 'nav-hidden'}`} style={{marginRight: '30px'}}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/movies/popular" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Popular</Link>
          <Link to="/movies/top_rated" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Top</Link>
          <Link to="/movies/upcoming" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Upcoming</Link>
        </div>
        
        <form className={`search-form ${mobileMenuOpen ? 'search-active' : 'search-hidden'}`} onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar; 