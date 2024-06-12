import React, { useState, useEffect } from "react";
import { SearchParams, searchSpots, Spot } from "../api/ApiService.ts";
import Card from "../layouts/Card.tsx";

const SearchSpots: React.FC = () => {
  const [message,setMessage] = useState("")
  const [spots, setSpots] = useState<Spot[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    name: "",
    city: "",
    workingFrom: "",
    workingTo: "",
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
      if (response.data.length === 0) {
        setMessage("Mesta nisu pronadjena.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching spots:", error);
      setMessage("Mesta nisu pronadjena.")
    }
  };

  const handleEnumChange = (e: any) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
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

  const getFirstImage = (spot: Spot): string => {
    if (spot.images && spot.images.length > 0) {
      return spot.images[0];
    }
    return "../src/assets/default-thumbnail.jpg";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col justify-center items-center">
    <br></br>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Pretražite mesta</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleInputChange}
              placeholder="Ime"
              className="input-field"
            />
            <input
              type="text"
              name="city"
              value={searchParams.city}
              onChange={handleInputChange}
              placeholder="Grad"
              className="input-field"
            />
            {/* <input
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
            /> */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="alwaysOpen"
                checked={searchParams.alwaysOpen}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Uvek otvoreno</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="outdoorSeating"
                checked={searchParams.outdoorSeating}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Terasa</label>
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spotType">Tip mesta</label>
            <select
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              id="spotType"
              name="spotType"
              value={searchParams.spotType}
              onChange={handleEnumChange}
            >
              <option value="">Odaberite tip mesta</option>
              <option value="RESTORAN">Restoran</option>
              <option value="BRZA_HRANA">Brza hrana</option>
              <option value="BAR">Bar</option>
              <option value="CAFE">Cafe</option>
              <option value="PUB">Pub</option>
              <option value="KAFIĆ">Kafić</option>
              <option value="POSLASTIČARNICA">Poslastičarnica</option>
              <option value="KAFANA">Kafana</option>
              <option value="PEKARA">Pekara</option>
              <option value="DRUGO">Drugo</option>
            </select>
      </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-6">Pretraži</button>
        </form>
      </div>
      <br></br>
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
            <Card
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

export default SearchSpots;
