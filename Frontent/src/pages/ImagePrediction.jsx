import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1742558349265.json"; 
import "../styles/imagePrediction.css"; 

const ImagePrediction = () => {
  const [predictedPrice, setPredictedPrice] = useState(null);

  return (
    <div className="image-prediction-container">
      <div className="lottie-wrapper">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="upload-wrapper">
        <ImageUpload onUpload={setPredictedPrice} />
        {predictedPrice && (
          <div className="prediction-card">
            <h3>Predicted Price</h3>
            <p>₹{predictedPrice.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePrediction;
