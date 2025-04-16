import React, { useState } from "react";
import "../styles/form.css";

const TextForm = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    mainroad: "yes",
    guestroom: "no",
    basement: "no",
    hotwaterheating: "no",
    airconditioning: "no",
    parking: "",
    prefarea: "no",
    furnishingstatus: "unfurnished",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      onPredict(data.predicted_price);
    } catch (error) {
      console.error("Error predicting price:", error);
    }
  };

  return (
    <div className="form-container">
    <h1>Text Based Price Prediction</h1>
      <h2>Enter House Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Area (sq ft):</label>
        <input type="number" name="area" value={formData.area} onChange={handleChange} required />

        <label>Bedrooms:</label>
        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

        <label>Bathrooms:</label>
        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />

        <label>Stories:</label>
        <input type="number" name="stories" value={formData.stories} onChange={handleChange} required />

        <label>Main Road:</label>
        <select name="mainroad" value={formData.mainroad} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Guest Room:</label>
        <select name="guestroom" value={formData.guestroom} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Basement:</label>
        <select name="basement" value={formData.basement} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Hot Water Heating:</label>
        <select name="hotwaterheating" value={formData.hotwaterheating} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Air Conditioning:</label>
        <select name="airconditioning" value={formData.airconditioning} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Parking Spaces:</label>
        <input type="number" name="parking" value={formData.parking} onChange={handleChange} required />

        <label>Preferred Area:</label>
        <select name="prefarea" value={formData.prefarea} onChange={handleChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label>Furnishing Status:</label>
        <select name="furnishingstatus" value={formData.furnishingstatus} onChange={handleChange}>
          <option value="unfurnished">Unfurnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
          <option value="furnished">Furnished</option>
        </select>

        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />

        <button type="submit">Predict Price</button>
      </form>
    </div>
  );
};

export default TextForm;
