import { useState, useEffect } from "react";
import { retrieveAllSpots } from "../api/ApiService.ts";
import Card from "../layouts/Card.tsx";
import { useMediaQuery } from "react-responsive";
import { Link } from 'react-router-dom';
import Button from "../layouts/Button.tsx";
import { useAuth } from '../api/AuthContex';

export interface Spot {
  spotId: string;
  name: string;
  description: string;
  city: string;
}

const HomePage = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const maxSlides = isMobile ? spots.length : Math.ceil(spots.length - 2);
  const authContext = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await authContext.login();
        const response = await retrieveAllSpots();
        setSpots(response.data);
        console.log("isLoggedIn")
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };

    fetchData();
  }, [authContext.login]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxSlides - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxSlides - 1 : prevIndex - 1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <div className="text-center">
      <h1 className="font-semibold text-4xl leading-tight">Dobrodošli na GdeDaIzadjemNa !</h1>
      <br></br>
      <p>Pronađite savršeno mesto za izlazak u nekoliko klikova!</p>
      <p>Vlasnici restorana takođe imaju koristi - promovišu svoje ponude i privlače nove goste.</p>
      <p>Krenite sada i otkrijte nezaboravne noći uz GdeDaIzadjemNa.com!</p>
      </div>

      <br></br>
      
      <div className={`relative ${isMobile ? 'w-full' : 'w-1/2'} overflow-hidden`}>
        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 ${!isMobile ? 'right-0' : ''}`} onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.33)}%)` }}>
          {spots.map((spot: Spot) => (
            <div key={spot.spotId} className={`w-full ${isMobile ? '' : 'lg:w-1/3'} px-4 flex-shrink-0`}>
              <Card key={spot.spotId} img={"/assets/unnamed.jpg"} nameOfSpot={spot.name} locationOfSpot={spot.city} spotId={spot.spotId}/>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/events">
          <Button title="Istraži događaje" />
        </Link>
        <Link to="/search">
          <Button title="Istraži mesta za izlazak" />
        </Link>
      </div>
    </div>
  );
};


export default HomePage;