import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ImagePrediction from "./pages/ImagePrediction";
import TextPrediction from "./pages/TextPrediction";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict-image" element={<ImagePrediction />} />
          <Route path="/predict-text" element={<TextPrediction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
