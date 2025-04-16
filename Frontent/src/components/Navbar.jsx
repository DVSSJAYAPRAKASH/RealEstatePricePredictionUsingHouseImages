import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">🏡 House Price Predictor</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/predict-image" onClick={() => setMenuOpen(false)}>Image Prediction</Link></li>
          <li><Link to="/predict-text" onClick={() => setMenuOpen(false)}>Text Prediction</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
