import { useState } from 'react';
import { addSpot } from '../api/ApiService';

const AddSpot = () => {
  const [spotData, setSpotData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    googleMapsUrl: '',
    websiteUrl: '',
    workingHours: '',
    alwaysOpen: false,
    phoneNumber: '',
    email: '',
    instagram: '',
    tiktok: '',
    facebook: '',
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
    spotType: '',
    musicTypes: [],
    ambianceTypes: [],
    cuisineTypes: [],
    availableActivities: [],
    specialties: [],
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSpotData({ ...spotData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Submitted data:', spotData);
    try {
        const response = await addSpot(spotData);
        console.log('Add Spot response:', response); 
      } catch (error) {
        console.error('Error adding spot:', error);
      }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Add a New Spot</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Naziv
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              value={spotData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Opis
            </label>
            <textarea
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              id="description"
              name="description"
              value={spotData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Grad
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="city"
              name="city"
              value={spotData.city}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Adresa
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="address"
              name="address"
              value={spotData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Broj telefona:
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={spotData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Email
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="email"
              name="email"
              value={spotData.email}
              onChange={handleChange}
            />
          </div>

          {/* Example: Working Hours */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workingHours">
              Working Hours
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="workingHours"
              name="workingHours"
              value={spotData.workingHours}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Website
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              value={spotData.websiteUrl}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Link ka instagramu
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="instagram"
              name="instagram"
              value={spotData.instagram}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Link ka tiktoku
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="tiktok"
              name="tiktok"
              value={spotData.tiktok}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Link ka facebooku
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="facebook"
              name="facebook"
              value={spotData.facebook}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spotType">
              Spot Type
            </label>
            <select
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              id="spotType"
              name="spotType"
              value={spotData.spotType}
              onChange={handleChange}
            >
              <option value="">Select Spot Type</option>
              <option value="RESTORAN ">Restoran</option>
              <option value="BRZA_HRANA">Brza hrana</option>
              <option value="BAR">Bar</option>
              <option value="KAFIĆ">Kafić</option>
              <option value="PUB">Pub</option>
              <option value="CAFE">Kafe</option>
              <option value="POSLASTIČARNICA">Poslastičarnica</option>
              <option value="KAFANA">Kafana</option>
              <option value="PEKARA">Pekara</option>
              <option value="DRUGO">Drugo</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Dvorište
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="outdoorSeating"
              name="outdoorSeating"
              checked={spotData.outdoorSeating}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Dostupan wifi
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="wifiAvailable"
              name="wifiAvailable"
              checked={spotData.wifiAvailable}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Parking
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="parking"
              name="parking"
              checked={spotData.parking}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Dozvoljeni ljubimci
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="petsAllowed"
              name="petsAllowed"
              checked={spotData.petsAllowed}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Vegeterianska hrana
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasSpecialDietaryOptionVegetarian"
              name="hasSpecialDietaryOptionVegetarian"
              checked={spotData.hasSpecialDietaryOptionVegetarian}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Veganska hrana
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasSpecialDietaryOptionVegan"
              name="hasSpecialDietaryOptionVegan"
              checked={spotData.hasSpecialDietaryOptionVegan}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Gluten free
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasSpecialDietaryOptionGlutenFree"
              name="hasSpecialDietaryOptionGlutenFree"
              checked={spotData.hasSpecialDietaryOptionGlutenFree}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Fitnes meni
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasFitnessMenu"
              name="hasFitnessMenu"
              checked={spotData.hasFitnessMenu}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Posna hrana
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasPosnaFood"
              name="hasPosnaFood"
              checked={spotData.hasPosnaFood}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">
              Doručak
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasBreakfast"
              name="hasBreakfast"
              checked={spotData.hasBreakfast}
              onChange={handleChange}
            />
          </div>

          {/* Example: Reviews Count */}
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviewsCount">
              Reviews Count
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="number"
              id="reviewsCount"
              name="reviewsCount"
              value={spotData.workingHours}
              onChange={handleChange}
            />
          </div> */}

          {/* Repeat similar blocks for other properties */}
          
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSpot;
