import React from 'react';

const MainPhotos = (props) => {
  return (
    <div className="header-carousel" id="cover-photo">
      <button aria-label="previous" className="carousel-nav prev" type="button">Left</button>
      <button aria-label="next" className="carousel-nav next" type="button">Right</button>
    </div>
  );
};

export default MainPhotos;
