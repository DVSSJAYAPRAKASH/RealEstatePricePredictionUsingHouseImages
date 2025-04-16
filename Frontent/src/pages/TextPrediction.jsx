import React, { useState } from "react";
import TextForm from "../components/TextForm";
import "../styles/textPrediction.css"; 

const TextPrediction = () => {
  const [predictedPrice, setPredictedPrice] = useState(null);

  return (
    <div className="text-prediction-container">
      <TextForm onPredict={setPredictedPrice} />
      {predictedPrice && (
        <div className="prediction-card">
          <h3>Predicted Price</h3>
          <p>₹{predictedPrice.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TextPrediction;
