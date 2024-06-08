import React, { useState } from "react";
import "./Card.css";

function Card({ frontImage, backImage }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={frontImage} alt="Front" loading="lazy" />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </div>
        <div className="card-back">
          <img src={backImage} alt="Back" loading="lazy" />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Card;
