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
    childsPlayground: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await searchSpots(searchParams);
      setSpots(response.data);
      if (response.data.length === 0) {
        setMessage("Lokali nisu pronadjeni.");
      } else {
        setMessage("");
      }
    } catch (error) {
      setMessage("Lokali nisu pronadjeni.")
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
        <h1 className="text-3xl font-semibold mb-6 text-center">Pretraga</h1>
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spotType">Tip lokala</label>
              <select
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
                id="spotType"
                name="spotType"
                value={searchParams.spotType}
                onChange={handleEnumChange}
              >
                <option value="">Odaberite tip lokala</option>
                <option value="RESTORAN">Restoran</option>
                <option value="BRZA_HRANA">Brza hrana</option>
                <option value="BAR">Bar</option>
                <option value="CAFE">Cafe</option>
                <option value="PUB">Pub</option>
                <option value="KAFIĆ">Kafić</option>
                <option value="POSLASTIČARNICA">Poslastičarnica</option>
                <option value="KAFANA">Kafana</option>
                <option value="PEKARA">Pekara</option>
                <option value="PICERIJA">Picerija</option>
                <option value="DRUGO">Drugo</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="musicTypes">Tip muzike</label>
              <select
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
                id="musicTypes"
                name="musicTypes"
                value={searchParams.musicTypes}
                onChange={handleEnumChange}
              >
                <option value="">Odaberite tip muzike</option>
                <option value="BEZ_MUZIKE">Bez muzike</option>
                <option value="POP">Pop</option>
                <option value="FOLK">Folk</option>
                <option value="HOUSE">House</option>
                <option value="HIP_HOP">Hip-hop</option>
                <option value="TREP">Trep</option>
                <option value="REP">Rep</option>
                <option value="DISKO">Disko</option>
                <option value="OPERA">Opera</option>
                <option value="TEHNO">Tehno</option>
                <option value="ROK">Rok</option>
                <option value="NARODNJACI">Narodnjaci</option>
                <option value="DUBSTEP">Dubstep</option>
                <option value="OPUŠTAJUĆE">Opuštajuće</option>
                <option value="INSTRUMENTAL">Instrumental</option>
                <option value="DRUGO">Drugo</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisineTypes">Tip kuhinje</label>
              <select
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
                id="cuisineTypes"
                name="cuisineTypes"
                value={searchParams.cuisineTypes}
                onChange={handleEnumChange}
              >
                <option value="">Odaberite tip kuhinje</option>
                <option value="PEČENO">Pečeno</option>
                <option value="POHOVANO">Pohovano</option>
                <option value="NA_PARI">Na pari</option>
                <option value="KUVANO">Kuvano</option>
                <option value="DIMNJENO">Dimnjeno</option>
                <option value="DOMAĆE">Domaće</option>
                <option value="ROŠTILJ">Roštilj</option>
                <option value="MORSKA_HRANA">Morska hrana</option>
                <option value="ITALIJANSKA">Italijanska</option>
                <option value="KINESKA">Kineska</option>
                <option value="MEKSIČKA">Meksička</option>
                <option value="FRANCUSKA">Francuska</option>
                <option value="JAPANSKA">Japanska</option>
                <option value="GRČKA">Grčka</option>
                <option value="INDIJSKA">Indijska</option>
                <option value="TAJLANDSKA">Tajlandska</option>
                <option value="DRUGO">Drugo</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ambianceTypes">Tip ambijenta</label>
              <select
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
                id="ambianceTypes"
                name="ambianceTypes"
                value={searchParams.ambianceTypes}
                onChange={handleEnumChange}
              >
                <option value="">Odaberite tip ambijenta</option>
                <option value="ELEGANTNO">Elegantno</option>
                <option value="BIZNIS">Biznis</option>
                <option value="ROMANTIČNO">Romantično</option>
                <option value="MODERNO">Moderno</option>
                <option value="ETNO">Etno</option>
                <option value="TIHO">Tiho</option>
                <option value="MINIMALISTIČKI">Minimalistički</option>
                <option value="URBANO">Urbano</option>
                <option value="OPUŠTAJUĆE">Opuštajuće</option>
                <option value="PORODIČNO">Porodično</option>
                <option value="PRIRODA">Priroda</option>
                <option value="ZA_RAD">Za rad</option>
                <option value="DRUGO">Drugo</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableActivities">Dostupne aktivnosti</label>
              <select
                className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
                id="availableActivities"
                name="availableActivities"
                value={searchParams.availableActivities}
                onChange={handleEnumChange}
              >
                <option value="">Odaberite dostupnu aktivnost</option>
                <option value="BILIJAR">Bilijar</option>
                <option value="STONI_TENIS">Stoni tenis</option>
                <option value="PIKADO">Pikado</option>
                <option value="DRUŠTVENE_IGRE">Društvene igre</option>
                <option value="KUGLANJE">Kuglanje</option>
                <option value="UŽIVO_ZABAVA">Uživo zabava</option>
                <option value="KARAOKE">Karaoke</option>
              </select>
            </div>
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="petsAllowed"
                checked={searchParams.petsAllowed}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Dozvoljeni ljubmici</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="parking"
                checked={searchParams.parking}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Parking</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasSpecialDietaryOptionVegetarian"
                checked={searchParams.hasSpecialDietaryOptionVegetarian}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Vegetarijanska hrana</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasSpecialDietaryOptionVegan"
                checked={searchParams.hasSpecialDietaryOptionVegan}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Veganska hrana</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasSpecialDietaryOptionGlutenFree"
                checked={searchParams.hasSpecialDietaryOptionGlutenFree}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Hrana bez glutena</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasFitnessMenu"
                checked={searchParams.hasFitnessMenu}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Fitnes meni</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasPosnaFood"
                checked={searchParams.hasPosnaFood}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Posne hrana</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasBreakfast"
                checked={searchParams.hasBreakfast}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Doručak</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="childsPlayground"
                checked={searchParams.childsPlayground}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <label className="text-sm">Igralište za decu</label>
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
