import React, { useState, useEffect } from "react";
import { SearchParams, searchSpots, Spot } from "../api/ApiService.ts";
import Card from "../layouts/Card.tsx";

const SearchSpots: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: "",
    city: "",
    workingFrom: 0,
    workingTo: 0,
    alwaysOpen: false,
    outdoorSeating: false,
    wifiAvailable: false,
    parking: false,
    petsAllowed: false,
    hasSpecialDietaryOptionVegetarian: false,
    hasSpecialDietaryOptionVegan: false,
    hasSpecialDietaryOptionGlutenFree: false,
    hasFitnessMenu: false,
    hasPosnaFood: false,
    hasBreakfast: false,
    spotType: "",
    musicTypes: [],
    ambianceTypes: [],
    cuisineTypes: [],
    availableActivities: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await searchSpots(searchParams);
      setSpots(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSearchParams({ ...searchParams, [name]: checked });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Find a Spot</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="input-field"
            />
            <input
              type="text"
              name="city"
              value={searchParams.city}
              onChange={handleInputChange}
              placeholder="City"
              className="input-field"
            />
            <input
              type="text"
              name="workingFrom"
              value={searchParams.workingFrom}
              onChange={handleInputChange}
              placeholder="Working From"
              className="input-field"
            />
            <input
              type="text"
              name="workingTo"
              value={searchParams.workingTo}
              onChange={handleInputChange}
              placeholder="Working To"
              className="input-field"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="alwaysOpen"
                checked={searchParams.alwaysOpen}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Always Open</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="outdoorSeating"
                checked={searchParams.outdoorSeating}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Outdoor Seating</label>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-6">Search</button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {spots.map((spot: Spot) => (
          <div key={spot.spotId}>
            <Card
              key={spot.spotId}
              img={"../src/assets/unnamed.jpg"}
              nameOfSpot={spot.name}
              locationOfSpot={spot.city + ", " + spot.address}
              spotId={spot.spotId}
              workingFrom={spot.workingFrom}
              workingTo={spot.workingTo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSpots;
