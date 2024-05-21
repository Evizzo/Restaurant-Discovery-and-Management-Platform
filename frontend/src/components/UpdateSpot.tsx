import { useState, useEffect } from "react";
import { retrieveSpotById, updateSpot } from '../api/ApiService';
import { useParams } from 'react-router-dom';

const UpdateSpot = () => {
  const [message,setMessage] = useState("")
  const [spotData, setSpotData] = useState({
    spotId: '',
    name: '',
    description: '',
    city: '',
    address: '',
    googleMapsUrl: '',
    websiteUrl: '',
    workingFrom: '',
    workingTo: '',
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
    musicTypes: [] as string[],
    ambianceTypes: [] as string[],
    cuisineTypes: [] as string[],
    availableActivities: [] as string[],
  });
  const { spotId } = useParams();

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        if (spotId) {
          const response = await retrieveSpotById(spotId);
          console.log(response.data)
          setSpotData(response.data);
        }
      } catch (error) {
        console.error("Greška pri dobavljanju lokala:", error);
      }
    };

    fetchSpot();
  }, [spotId]);


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
    console.log('Updated data:', spotData);
    try {
        const response = await updateSpot(spotData.spotId , spotData);
        setMessage("Uspešno ste izmenili Vaš objekat !")
        setSpotData({
          spotId: '',
          name: '',
          description: '',
          city: '',
          address: '',
          googleMapsUrl: '',
          websiteUrl: '',
          workingFrom: '',
          workingTo: '',
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
        });
        console.log('Add Spot response:', response); 
      } catch (error: any) {
        setMessage(error.response.data.message)
      }
  };

  const musicTypes = [
    "BEZ_MUZIKE",
    "POP",
    "FOLK",
    "HOUSE",
    "HIP_HOP",
    "TREP",
    "REP",
    "DISKO",
    "OPERA",
    "TEHNO",
    "ROK",
    "NARODNJACI",
    "DUBSTEP",
    "OPUŠTAJUĆE",
    "INSTRUMENTAL",
    "DRUGO"
  ];  

  const cuisineTypes = [
    "PEČENO", "POHOVANO", "NA_PARI", "KUVANO", "DIMNJENO", "DOMAĆE",
    "ROŠTILJ", "MORSKA_HRANA", "ITALIJANSKA", "KINESKA", "MEKSIČKA",
    "FRANCUSKA", "JAPANSKA", "GRČKA", "INDIJSKA", "TAJLANDSKA", "DRUGO"
  ];
  
  const ambianceTypes = [
    "ELEGANTNO",
    "BIZNIS",
    "ROMANTIČNO",
    "MODERNO",
    "ETNO",
    "TIHO",
    "MINIMALISTIČKI",
    "URBANO",
    "OPUŠTAJUĆE",
    "PORODIČNO",
    "PRIRODA",
    "ZA_RAD",
    "DRUGO"
  ];
  
  const availableActivities = [
    "BILIJAR",
    "STONI_TENIS",
    "PIKADO",
    "DRUŠTVENE_IGRE",
    "DEČIJA_IGRAONICA",
    "KUGLANJE",
    "UŽIVO_ZABAVA",
    "KARAOKE"
  ];

  const handleAvailableActivitiesSelect = (availableActivitie: any) => {
    if (!spotData.availableActivities.includes(availableActivitie)) {
      setSpotData(prevSpotData => ({
        ...prevSpotData,
        availableActivities: [...prevSpotData.availableActivities, availableActivitie]
      }));
    }
  };

  const handleRemoveMusicTypes = (musicType: any) => {
    setSpotData(prevSpotData => ({
      ...prevSpotData,
      musicTypes: prevSpotData.musicTypes.filter(type => type !== musicType)
    }));
  };

  const handleAvailableMusicTypes = (musicType: any) => {
    if (!spotData.musicTypes.includes(musicType)) {
      setSpotData(prevSpotData => ({
        ...prevSpotData,
        musicTypes: [...prevSpotData.musicTypes, musicType]
      }));
    }
  };

  const handleRemoveAvailableActivities = (availableActivitie: any) => {
    setSpotData(prevSpotData => ({
      ...prevSpotData,
      availableActivities: prevSpotData.availableActivities.filter(type => type !== availableActivitie)
    }));
  };

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
  
  const handleAmbianceTypeSelect = (ambianceType: any) => {
    if (!spotData.ambianceTypes.includes(ambianceType)) {
      setSpotData(prevSpotData => ({
        ...prevSpotData,
        ambianceTypes: [...prevSpotData.ambianceTypes, ambianceType]
      }));
    }
  };

  const handleRemoveAmbianceType = (ambianceType: any) => {
    setSpotData(prevSpotData => ({
      ...prevSpotData,
      ambianceTypes: prevSpotData.ambianceTypes.filter(type => type !== ambianceType)
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Izmenite objekat</h1>
        <form onSubmit={handleSubmit}>

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
          <input
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
            type="text"
            id="workingFrom"
            name="workingFrom"
            value={spotData.workingFrom}
            onChange={handleChange}
            disabled={spotData.alwaysOpen}
            placeholder="HH:MM" 
          />

          <input
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"
            type="text"
            id="workingTo"
            name="workingTo"
            value={spotData.workingTo}
            onChange={handleChange}
            disabled={spotData.alwaysOpen}
            placeholder="HH:MM"
          />
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alwaysOpen">24/7</label>
            <input
              type="checkbox"
              id="alwaysOpen"
              name="alwaysOpen"
              checked={spotData.alwaysOpen}
              onChange={handleChange}
            />
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
            </select>
          </div>

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

          <div className="mb-6">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2">Additional Options</label> */}
            <div className="space-y-2">
            </div>
          </div>
          <div className="mb-4">
            <br></br>
            <hr></hr>
            <br></br>
            <h2 className="text-xl font-semibold mb-2">Izaberite tipove kuhinje</h2>
            <select className="border border-gray-300 rounded px-3 py-2 w-full" onChange={(e) => handleCuisineTypeSelect(e.target.value)}>
              <option value="">Izaberite tipove kuhinje</option>
              {cuisineTypes.map((cuisineType, index) => (
                <option key={index} value={cuisineType}>{toNormalCase(cuisineType)}</option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Izabrani tipovi kuhinje</h3>
            {spotData.cuisineTypes.length === 0 && <p>Niste izabrali tipove kuhinje</p>}
            {spotData.cuisineTypes.map((cuisineType, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 mb-2">
                <span>{toNormalCase(cuisineType)}</span>
                <button type="button" onClick={() => handleRemoveCuisineType(cuisineType)} className="text-red-500 hover:text-red-700">X</button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <br></br>
            <hr></hr>
            <br></br>
            <h2 className="text-xl font-semibold mb-2">Izaberite tipove ambijenta</h2>
            <select className="border border-gray-300 rounded px-3 py-2 w-full" onChange={(e) => handleAmbianceTypeSelect(e.target.value)}>
              <option value="">Izaberite tipove ambijenta</option>
              {ambianceTypes.map((ambianceTypes, index) => (
                <option key={index} value={ambianceTypes}>{toNormalCase(ambianceTypes)}</option>
              ))}
            </select>
          </div>
          <br></br>
          <div>
            <h3 className="text-xl font-semibold mb-2">Izabrani tipovi ambijenta</h3>
            {spotData.ambianceTypes.length === 0 && <p>Niste izabrali tipove ambijenta</p>}
            {spotData.ambianceTypes.map((ambianceTypes, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 mb-2">
                <span>{toNormalCase(ambianceTypes)}</span>
                <button type="button" onClick={() => handleRemoveAmbianceType(ambianceTypes)} className="text-red-500 hover:text-red-700">X</button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <br></br>
            <hr></hr>
            <br></br>
            <h2 className="text-xl font-semibold mb-2">Izaberite aktivnosti</h2>
            <select className="border border-gray-300 rounded px-3 py-2 w-full" onChange={(e) => handleAvailableActivitiesSelect(e.target.value)}>
              <option value="">Izaberite aktivnosti</option>
              {availableActivities.map((availableActivities, index) => (
                <option key={index} value={availableActivities}>{toNormalCase(availableActivities)}</option>
              ))}
            </select>
          </div>
          <br></br>
          <div>
            <h3 className="text-xl font-semibold mb-2">Izabrane aktivnosti</h3>
            {spotData.availableActivities.length === 0 && <p>Niste izabrali aktivnosti</p>}
            {spotData.availableActivities.map((availableActivities, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 mb-2">
                <span>{toNormalCase(availableActivities)}</span>
                <button type="button" onClick={() => handleRemoveAvailableActivities(availableActivities)} className="text-red-500 hover:text-red-700">X</button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <br></br>
            <hr></hr>
            <br></br>
            <h2 className="text-xl font-semibold mb-2">Izaberite tip muzike</h2>
            <select className="border border-gray-300 rounded px-3 py-2 w-full" onChange={(e) => handleAvailableMusicTypes(e.target.value)}>
              <option value="">Izaberite tip muzike</option>
              {musicTypes.map((musicTypes, index) => (
                <option key={index} value={musicTypes}>{toNormalCase(musicTypes)}</option>
              ))}
            </select>
          </div>
          <br></br>
          <div>
            <h3 className="text-xl font-semibold mb-2">Izabrani tipovi muzike</h3>
            {spotData.musicTypes.length === 0 && <p>Niste izabrali tipove muzike</p>}
            {spotData.musicTypes.map((musicTypes, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md px-3 py-2 mb-2">
                <span>{toNormalCase(musicTypes)}</span>
                <button type="button" onClick={() => handleRemoveMusicTypes(musicTypes)} className="text-red-500 hover:text-red-700">X</button>
              </div>
            ))}
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

export default UpdateSpot;
