import '../Style/Crops.css'
import  { useState, useEffect } from 'react';
import cropsData from './CropsData'; // Assuming CropsData.jsx is in the same directory

const CropGallery = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSelectedCrop(null);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="crop-gallery">
      {cropsData.map((crop, index) => (
        <div key={index} className="crop-card" onClick={() => handleCropClick(crop)}>
          <img src={crop.crop_image} alt={crop.crop_name_en} />
          <div className="crop-overlay">
                  <h3>{crop.crop_name_en} {crop.crop_name_bn}</h3>
          </div>
        </div>
      ))}
      {selectedCrop && (
        <div className="crop-description">
                  <h3>{selectedCrop.crop_name_en} {selectedCrop.crop_name_bn }</h3>
          <p>{selectedCrop.description_bn}</p>
        </div>
      )}
    </div>
  );
};

export default CropGallery;
