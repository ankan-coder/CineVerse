import React, { useState, useEffect } from 'react';
import '../styles/PageTransition.css';

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initially set to false for fade-in effect
    setIsVisible(false);
    
    // Set a small timeout to trigger the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div className={`page-transition ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition; 