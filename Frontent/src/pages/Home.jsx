import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1742557980088.json"; 
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to House Price Predictor</h1>
      <p>Predict house prices using images or property details.</p>
      <div className="lottie-container">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <div className="home-buttons">
        <Link to="/predict-image" className="home-btn">📷 Predict via Images</Link>
        <Link to="/predict-text" className="home-btn">📝 Predict via Text</Link>
      </div>
    </div>
  );
};

export default Home;
