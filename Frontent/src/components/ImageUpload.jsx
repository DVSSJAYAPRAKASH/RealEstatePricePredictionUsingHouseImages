import React, { useState } from "react";
import "../styles/form.css";

const ImageUpload = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 4) {
      setSelectedFiles(files);
    } else {
      alert("Please upload exactly 4 images.");
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length !== 4) {
      alert("Please select 4 images before uploading.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      onUpload(data.predicted_price);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="image-upload-container">
    <h1>Image Based Price Prediction</h1>
      <h2>Upload House Images</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Predict Price</button>
    </div>
  );
};

export default ImageUpload;
