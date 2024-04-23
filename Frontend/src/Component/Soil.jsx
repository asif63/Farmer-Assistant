import '../Style/Soil.css'
import soilData from './SoilData2'; // Assuming SoilData.jsx is in the same directory

const SoilInfo = () => {
  return (
    <div className="soil-container">
      {soilData.map(soil => (
        <div key={soil.soil_id} className="soil-card">
          <img src={soil.soil_image} alt={soil.soil_name_en} className="soil-image" />
          <div className="soil-description">
                  <h2>{soil.soil_name_en} { soil.soil_name_bn}</h2>
            <p>{soil.description_bn}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoilInfo;