import React, { useState, useEffect } from "react";
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import beauty from '../assets/beauty.png';

const images = [img1, img2, img3, beauty];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden">
  <img
    src={images[current]}
    alt={`slide-${current}`}
    className="w-full h-64 sm:h-60 md:h-96 object-cover transition duration-500 rounded-lg sm:rounded-2xl"
  />
</div>


      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black px-2 py-1 rounded-full hover:bg-white"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black px-2 py-1 rounded-full hover:bg-white"
      >
        &#8594;
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
