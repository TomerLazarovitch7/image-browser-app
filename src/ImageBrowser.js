import React, { useState, useEffect } from 'react';
import './ImageBrowser.css'; // Assuming you have your styles in ImageBrowser.css

// ImageBrowser component
function ImageBrowser() {
  // State for storing images fetched from the API
  const [images, setImages] = useState([]);
  // State for the currently selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect to fetch images on component mount
  useEffect(() => {
    fetch('https://picsum.photos/v2/list')
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setSelectedImage(data[0]); // Set the first image as selected by default
      });
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to update the selected image
  const selectImage = (image) => {
    setSelectedImage(image);
  };

  // Navigate to the previous image
  const prevImage = () => {
    const index = images.indexOf(selectedImage);
    if (index > 0) {
      setSelectedImage(images[index - 1]);
    }
  };

  // Navigate to the next image
  const nextImage = () => {
    const index = images.indexOf(selectedImage);
    if (index < images.length - 1) {
      setSelectedImage(images[index + 1]);
    }
  };

  // Render the component
  return (
    <div className="container mt-4">
      {/* Thumbnail gallery */}
      <div className="thumbnail-container" id="thumbnailContainer">
        {images.map((image) => (
          <div
            key={image.id}
            className={`thumbnail ${image.id === selectedImage?.id ? 'active' : ''}`}
            onClick={() => selectImage(image)}
          >
            <img src={image.download_url} alt="Thumbnail" />
          </div>
        ))}
      </div>
    
      {/* Main image display with navigation icons */}
      <div className="main-image-container text-center">
        {/* Previous image navigation icon */}
        <div className="navigation-icon left" onClick={prevImage}>&lt;</div>
        
        {/* Main image */}
        {selectedImage && (
          <img
            src={selectedImage.download_url}
            className="main-image img-thumbnail mb-3"
            alt="Selected"
          />
        )}
        
        {/* Next image navigation icon */}
        <div className="navigation-icon right" onClick={nextImage}>&gt;</div>
      </div>
    </div>
  );
}
  export default ImageBrowser;