import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

interface StarRatingProps {
  maxStars: number;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating || 0);

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={index < rating ? solidStar : regularStar}
          className="text-gray-800 cursor-pointer"
        />
      ))}
    </div>
  );
};

export default StarRating;
