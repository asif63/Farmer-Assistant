// Services.jsx

import { useState } from "react";
import axios from "axios";
import "../Style/Services.css";
import cropsData from "../Component/CropsData"; // Adjust the path as needed
import locationData from "../Component/LocationData"; // Import location data
import monthData from "../Component/MonthData";
import soilData from "../Component/SoilData";


const LocationMonthSoilCrops = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [soil, setSoil] = useState("");
  const [locationName, setLocationName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      if (!month || !soil || !locationName) {
        setErrorMessage("Please provide correct data");
        return;
      }

      const response = await axios.get("http://localhost:3000/crops", {
        params: { month, soil, location: locationName },
      });

      const serverData = response.data;

      const enrichedData = serverData.map((crop) => {
        const matchingCrop = cropsData.find((c) => c.crop_id === crop.crop_id);
        return {
          ...crop,
          crop_image: matchingCrop ? matchingCrop.crop_image : null,
          crop_name_bn: matchingCrop ? matchingCrop.crop_name_bn : null,
        };
      });

      setData(enrichedData);
      setErrorMessage(
        enrichedData.length ? "Suggested Crops" : "No crops found"
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data");
    }
  };

  const handlePredictionButtonClick = () => {
    fetchData();
  };

  return (
    <div className="services-container">
      <h2 className="services-title">Crop Suggestion</h2>
      <div className="services-filters">
        <label className="services-label">
          Month:
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="services-input">
            <option value="">Select Month</option>
            {monthData.map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="services-label">
          Soil:
          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="services-input"
          >
            <option value="">Select Soil</option>
            {soilData.map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="services-label">
          Location:
          <select
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="services-input"
          >
            <option value="">Select Location</option>
            {locationData.map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={handlePredictionButtonClick}
          className="services-button"
        >
          Predict
        </button>
      </div>
      {errorMessage && <p className="services-error-message">{errorMessage}</p>}
      <table className="services-table">
        <thead>
          <tr>
            <th className="services-th">Crop ID</th>
            <th className="services-th">Crop Name in English</th>
            <th className="services-th">Crop Name in Bangla</th>
            <th className="services-th">Crop Image</th>

          </tr>
        </thead>
        <tbody>
          {data.map((crop) => (
            <tr key={crop.crop_id}>
              <td className="services-td">{crop.crop_id}</td>
              <td className="services-td">{crop.crop_name}</td>
              <td className="services-td">{crop.crop_name_bn}</td>
              <td className="services-td">
                {crop.crop_image && (
                  <img
                    src={crop.crop_image}
                    alt={`Crop ${crop.crop_name}`}
                    className="services-img"
                    onError={(e) => console.error("Error loading image:", e)}
                  />
                  
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationMonthSoilCrops;
