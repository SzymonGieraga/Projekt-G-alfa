import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Plan_zajec.css';

// Dynamically import images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(require.context('../images_disc', false, /\.(png|jpe?g|svg)$/));

const Timetable = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Plany zajęć");
  }, [setTitle]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = Object.values(images);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((currentImageIndex + 1) % imageArray.length);
  }, [currentImageIndex, imageArray.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((currentImageIndex - 1 + imageArray.length) % imageArray.length);
  }, [currentImageIndex, imageArray.length]);

  useEffect(() => {
    // Preload images
    imageArray.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imageArray]);

  return (
    <div className="timetable-container">
              <button className="button left" onClick={prevImage} aria-label="Previous">&#10094;</button>
              

      <div className="timetable-image-container">
        
        {imageArray.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Plan ${index + 1}`}
            className={`timetable-image ${currentImageIndex === index ? 'active' : ''}`}
            style={{ display: currentImageIndex === index ? 'block' : 'none' }}
          />
        ))}
        
      </div>
      <button className="button right" onClick={nextImage} aria-label="Next">&#10095;</button>
    </div>
    
  );
};

Timetable.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default Timetable;
