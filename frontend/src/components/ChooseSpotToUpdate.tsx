import React, { useState, useEffect } from "react";
import { retrieveAllOwnerSpots, Spot } from "../api/ApiService.ts";
import UpdateSpotCard from "../layouts/UpdateSpotCard.tsx";

const ChooseSpotToUpadte: React.FC = () => {
  const [message,setMessage] = useState("")
  const [spots, setSpots] = useState<Spot[]>([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await retrieveAllOwnerSpots();
      let data = response.data;
  
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
  
      if (Array.isArray(data)) {
        setSpots(data);
      } else {
        console.error("Unexpected data format:", data);
        setSpots([]);
        setMessage("Mesta nisu pronadjena.");
      }
  
      console.log(response);
  
      if (data.length === 0) {
        setMessage("Mesta nisu pronadjena.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching spots:", error);
      setMessage("Mesta nisu pronadjena.");
    }
  };

  const getFirstImage = (spot: Spot): string => {
    if (spot.images && spot.images.length > 0) {
      return spot.images[0];
    }
    return "../src/assets/default-thumbnail.jpg";
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col justify-center items-center">
      <br></br>
      <h1 className="text-3xl font-semibold mb-6 text-center">Vaša mesta</h1>
      {message && (
          <div className="flex items-center bg-yellow-100 rounded-lg p-3 mb-4">
            <div className="text-yellow-800">
              <svg className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8v4m0 4h.01"></path>
              </svg>
            </div>
            <div className="text-yellow-700">
              <p className="font-bold">Obaveštenje:</p>
              <p>{message}</p>
            </div>
          </div>
        )} 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {spots.map((spot: Spot) => (
          <div key={spot.spotId}>
            <UpdateSpotCard
              key={spot.spotId}
              img={getFirstImage(spot)}
              nameOfSpot={spot.name}
              locationOfSpot={spot.city + ", " + spot.address}
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

export default ChooseSpotToUpadte;
