import { Link } from 'react-router-dom';
import Button from '../layouts/Button';
import { Spot, retrieveAllSpots } from "../api/ApiService.ts";
import { useState, useEffect } from "react";
import Card from '../layouts/Card.tsx';
import { useAuth } from "../api/AuthContex";

const HomePage = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const authContext = useAuth();

  useEffect(() => {
    const initializePage = async () => {
      try {
        await authContext.login();
        const response = await retrieveAllSpots();
        setSpots(response.data);
      } catch (error) {
        console.error('Error fetching spots:', error);
      }
    };

    initializePage();
  }, [authContext]);

  const getFirstImage = (spot: Spot): string => {
    if (spot.images && spot.images.length > 0) {
      return spot.images[0];
    }
    return "../src/assets/default-thumbnail.jpg";
  };

  const visibleSpots = spots.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="text-center">
        <h1 className="font-semibold text-4xl leading-tight mb-2">Gde da izadjem na...?</h1>
        <h3 className="font-semibold text-2xl leading-tight mb-4">Istraži mesta</h3>
        <Link to="/search">
          <Button title="Istražite mesta za izlazak" />
        </Link>
      </div>
      <div className="text-center mt-8">
        <h3 className="font-semibold text-2xl leading-tight mb-2">Imaš svoj lokal?</h3>
        <Link to="/add-spot">
          <Button title="Oglasi ga ovde" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {visibleSpots.map((spot: Spot) => (
            <div key={spot.spotId} className="flex-shrink-0 w-full sm:w-1/3 px-2">
              <Card
                key={spot.spotId}
                img={getFirstImage(spot)}
                nameOfSpot={spot.name}
                locationOfSpot={`${spot.city}, ${spot.address}`}
                spotId={spot.spotId}
                workingFrom={spot.workingFrom}
                workingTo={spot.workingTo}
                rating={spot.totalReview}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default HomePage;