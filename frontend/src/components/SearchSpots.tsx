import React, { useState, useEffect } from "react";
import { retrieveAllSpots, Spot } from "../api/ApiService.ts";
import Card from "../layouts/Card.tsx";

const SearchSpots: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveAllSpots();
        setSpots(response.data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="text-center">
        <h1 className="font-semibold text-4xl leading-tight">Pretrazite mesto koje vam odgovara !</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {spots.map((spot: Spot) => (
          <div key={spot.spotId}>
            <Card key={spot.spotId} img={"../src/assets/unnamed.jpg"} nameOfSpot={spot.name} locationOfSpot={spot.city + ", " + spot.address} spotId={spot.spotId} workingHours={spot.workingHours}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSpots;
