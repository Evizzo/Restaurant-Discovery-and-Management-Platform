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
    cuisineTypes: [] as string[],
    availableActivities: [],
    specialties: [],
  });
  const toNormalCase = (str: string) => {
    return str.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
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

  const cuisineTypes = [
    "PEČENO", "POHOVANO", "NA_PARI", "KUVANO", "DIMNJENO", "DOMAĆE",
    "ROŠTILJ", "MORSKA_HRANA", "ITALIJANSKA", "KINESKA", "MEKSIČKA",
    "FRANCUSKA", "JAPANSKA", "GRČKA", "INDIJSKA", "TAJLANDSKA", "DRUGO"
  ];

  const handleCuisineTypeSelect = (cuisineType: any) => {
    if (!spotData.cuisineTypes.includes(cuisineType)) {
      setSpotData(prevSpotData => ({
        ...prevSpotData,
        cuisineTypes: [...prevSpotData.cuisineTypes, cuisineType]
      }));
    }
  };

  const handleRemoveCuisineType = (cuisineType: any) => {
    setSpotData(prevSpotData => ({
      ...prevSpotData,
      cuisineTypes: prevSpotData.cuisineTypes.filter(type => type !== cuisineType)
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Dodajte objekat</h1>
        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Ime</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              value={spotData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Opis</label>
            <textarea
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              id="description"
              name="description"
              value={spotData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Grad</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="city"
              name="city"
              value={spotData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Adresa</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="address"
              name="address"
              value={spotData.address}
              onChange={handleChange}
            />
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Broj telefona</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={spotData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="email"
              name="email"
              value={spotData.email}
              onChange={handleChange}
            />
          </div>

          {/* Social Media Links */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">Instagram</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="instagram"
              name="instagram"
              value={spotData.instagram}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiktok">TikTok</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="tiktok"
              name="tiktok"
              value={spotData.tiktok}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebook">Facebook</label>
            <input
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              type="text"
              id="facebook"
              name="facebook"
              value={spotData.facebook}
              onChange={handleChange}
            />
          </div>

          {/* Spot Details */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spotType">Tip mesta</label>
            <select
              className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
              id="spotType"
              name="spotType"
              value={spotData.spotType}
              onChange={handleChange}
            >
              <option value="">Odaberite tip mesta</option>
              <option value="RESTORAN">Restoran</option>
              <option value="BRZA_HRANA">Brza hrana</option>
              <option value="BAR">Bar</option>
              <option value="CAFE">Cafe</option>
              <option value="PUB">Pub</option>
              {/* Add other spot types */}
            </select>
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Odlike</label>
            <div className="space-y-2">
              <label htmlFor="outdoorSeating" className="flex items-center">
                <input
                  type="checkbox"
                  id="outdoorSeating"
                  name="outdoorSeating"
                  checked={spotData.outdoorSeating}
                  onChange={handleChange}
                />
                <span className="ml-2">Dvorište</span>
              </label>
              <label htmlFor="wifiAvailable" className="flex items-center">
                <input
                  type="checkbox"
                  id="wifiAvailable"
                  name="wifiAvailable"
                  checked={spotData.wifiAvailable}
                  onChange={handleChange}
                />
                <span className="ml-2">Wi-Fi</span>
              </label>
              <label htmlFor="parking" className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  checked={spotData.parking}
                  onChange={handleChange}
                />
                <span className="ml-2">Parking</span>
              </label>
              <label htmlFor="petsAllowed" className="flex items-center">
                <input
                  type="checkbox"
                  id="petsAllowed"
                  name="petsAllowed"
                  checked={spotData.petsAllowed}
                  onChange={handleChange}
                />
                <span className="ml-2">Dozvoljeni ljubimci</span>
              </label>
            </div>
          </div>

          {/* Special Dietary Options */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Poseban tip hrane</label>
            <div className="space-y-2">
              <label htmlFor="hasSpecialDietaryOptionVegetarian" className="flex items-center">
                <input
                  type="checkbox"
                  id="hasSpecialDietaryOptionVegetarian"
                  name="hasSpecialDietaryOptionVegetarian"
                  checked={spotData.hasSpecialDietaryOptionVegetarian}
                  onChange={handleChange}
                />
                <span className="ml-2">Vegeterianska</span>
              </label>
              <label htmlFor="hasSpecialDietaryOptionVegan" className="flex items-center">
                <input
                  type="checkbox"
                  id="hasSpecialDietaryOptionVegan"
                  name="hasSpecialDietaryOptionVegan"
                  checked={spotData.hasSpecialDietaryOptionVegan}
                  onChange={handleChange}
                />
                <span className="ml-2">Veganska</span>
              </label>
              <label htmlFor="hasSpecialDietaryOptionGlutenFree" className="flex items-center">
                <input
                  type="checkbox"
                  id="hasSpecialDietaryOptionGlutenFree"
                  name="hasSpecialDietaryOptionGlutenFree"
                  checked={spotData.hasSpecialDietaryOptionGlutenFree}
                  onChange={handleChange}
                />
                <span className="ml-2">Bez glutena</span>
              </label>
              <label htmlFor="hasPosnaFood" className="flex items-center">
                <input
                  type="checkbox"
                  id="hasPosnaFood"
                  name="hasPosnaFood"
                  checked={spotData.hasPosnaFood}
                  onChange={handleChange}
                />
                <span className="ml-2">Posna hrana</span>
              </label>
              <label htmlFor="hasBreakfast" className="flex items-center">
                <input
                  type="checkbox"
                  id="hasBreakfast"
                  name="hasBreakfast"
                  checked={spotData.hasBreakfast}
                  onChange={handleChange}
                />
                <span className="ml-2">Doručak</span>
              </label>
              <label htmlFor="hasFitnessMenu" className="flex items-center">
                <input
                  type="checkbox"
                  id="hasFitnessMenu"
                  name="hasFitnessMenu"
                  checked={spotData.hasFitnessMenu}
                  onChange={handleChange}
                />
                <span className="ml-2">Fitnes meni</span>
              </label>
            </div>
          </div>

          {/* Additional Options */}
          <div className="mb-6">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2">Additional Options</label> */}
            <div className="space-y-2">
              {/* Add additional options here */}
            </div>
          </div>
          <div className="mb-4">
            {/* <h2 className="text-xl font-semibold mb-2">Izaberite tipove kuhinje</h2> */}
            <select className="border border-gray-300 rounded px-3 py-2 w-full" onChange={(e) => handleCuisineTypeSelect(e.target.value)}>
              <option value="">Izaberite tipove kuhinje</option>
              {cuisineTypes.map((cuisineType, index) => (
                <option key={index} value={cuisineType}>{toNormalCase(cuisineType)}</option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Izabrani tipovi kuhinje</h2>
            {spotData.cuisineTypes.length === 0 && <p>Niste izabrali tipove kuhinje</p>}
            {spotData.cuisineTypes.map((cuisineType, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 mb-2">
                <span>{toNormalCase(cuisineType)}</span>
                <button type="button" onClick={() => handleRemoveCuisineType(cuisineType)} className="text-red-500 hover:text-red-700">X</button>
              </div>
            ))}
          </div>
          <br></br>
          <br></br>
          <br></br>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Pošalji
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSpot;
