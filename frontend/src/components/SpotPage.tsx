import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addReviewToSpot, retrieveSpotById } from "../api/ApiService.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface SpotPageProps {}

export interface Spot {
  spotId: string;
  name: string;
  description: string;
  city: string;
  address: string;
  googleMapsUrl: string;
  websiteUrl: string;
  workingHours: string;
  alwaysOpen: boolean;
  phoneNumber: string;
  email: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  outdoorSeating: boolean;
  wifiAvailable: boolean;
  parking: boolean;
  petsAllowed: boolean;
  hasSpecialDietaryOptionVegetarian: boolean;
  hasSpecialDietaryOptionVegan: boolean;
  hasSpecialDietaryOptionGlutenFree: boolean;
  hasFitnessMenu: boolean;
  hasTakeout: boolean;
  hasPosnaFood: boolean;
  reviewsCount: number;
  spotType: string;
  musicTypes: string[];
  ambianceTypes: string[];
  cuisineTypes: string[];
  availableActivities: string[];
  specialties: string[];
  reviews: any[];
}

const SpotPage: React.FC<SpotPageProps> = () => {
  const { spotId } = useParams<{ spotId?: string }>();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [reviewForm, setReviewForm] = useState({
    totalRating: 0,
    hygieneRating: 0,
    comment: ""
  });
  useEffect(() => {
    const fetchSpot = async () => {
      try {
        if (spotId) {
          const response = await retrieveSpotById(spotId);
          console.log(response.data)
          setSpot(response.data);
        }
      } catch (error) {
        console.error("Greška pri dobavljanju lokala:", error);
      }
    };

    fetchSpot();
  }, [spotId]);

  if (!spot) {
    return <div>Učitavanje...</div>;
  }

  const images = [
    {
      original: '../src/assets/unnamed.jpg',
      thumbnail: '../src/assets/unnamed.jpg',
      description: spot.name
    },
    {
      original: '../src/assets/unnamed.jpg',
      thumbnail: '../src/assets/unnamed.jpg',
      description: spot.name
    },
    {
      original: '../src/assets/unnamed.jpg',
      thumbnail: '../src/assets/unnamed.jpg',
      description: spot.name
    },
    {
      original: '../src/assets/unnamed.jpg',
      thumbnail: '../src/assets/unnamed.jpg',
      description: spot.name
    },
  ];

  const handleReviewFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const submitReview = async () => {
    try {
      await addReviewToSpot(spot.spotId, reviewForm);
        const updatedSpotResponse = await retrieveSpotById(spot.spotId);
        setSpot(updatedSpotResponse.data);
        setReviewForm({ totalRating: 0, hygieneRating: 0, comment: "" });
    } catch (error) {
      console.error("Greška pri slanju recenzije:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col items-center justify-center px-5 py-10">
      <div className="max-w-4xl w-full bg-white bg-opacity-30 rounded-lg shadow-xl p-8">
      <div className="mt-8">
          <ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} />
        </div>
        <h1 className="font-semibold text-4xl text-gray-800 mb-4">{spot.name} ({spot.reviewsCount})</h1>
        <p className="text-lg text-gray-700 mb-6">{spot.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
          <div className="border-r border-gray-400 pr-4">
            <p className="text-lg mb-4">
              <strong>Tip:</strong> {spot.spotType}
            </p>
            <p className="text-lg mb-4">
              <strong>Lokacija:</strong> {spot.city}, {spot.address}
            </p>
            <p className="text-lg mb-4">
              <strong>Telefon:</strong> {spot.phoneNumber}
            </p>
            <p className="text-lg mb-4">
              <strong>Radno vreme:</strong> {spot.workingHours}
            </p>
          </div>
          <div className="border-r border-gray-400 pr-4">
            <p className="text-lg mb-4">
              <strong>Tipovi muzike:</strong> {spot.musicTypes.join(", ")}
            </p>
            <p className="text-lg mb-4">
              <strong>Tipovi ambijenta:</strong> {spot.ambianceTypes.join(", ")}
            </p>
            <p className="text-lg mb-4">
              <strong>Tipovi kuhinje:</strong> {spot.cuisineTypes.join(", ")}
            </p>
            <p className="text-lg mb-4">
              <strong>Dostupne aktivnosti:</strong> {spot.availableActivities.join(", ")}
            </p>
            <p className="text-lg mb-4">
              <strong>Specijaliteti:</strong> {spot.specialties.join(", ")}
            </p>
          </div>
          <div>
            <p className="text-lg mb-4">
              <strong>Odlike:</strong>
            </p>
            {/* <p className="text-lg mb-4">
              Wi-Fi: {spot.wifiAvailable ? "Da" : "Ne"}
            </p> */}
            <p className="text-lg mb-4">
              Parking: {spot.parking ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              Ljubimci dozvoljeni: {spot.petsAllowed ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              Vegetarijanske opcije: {spot.hasSpecialDietaryOptionVegetarian ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              Veganske opcije: {spot.hasSpecialDietaryOptionVegan ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              Opcije bez glutena: {spot.hasSpecialDietaryOptionGlutenFree ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              Fitnes meni: {spot.hasFitnessMenu ? "Da" : "Ne"}
            </p>
            {/* <p className="text-lg mb-4">
              Poneti: {spot.hasTakeout ? "Da" : "Ne"}
            </p> */}
            <p className="text-lg mb-4">
              Posna hrana: {spot.hasPosnaFood ? "Da" : "Ne"}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <a href={spot.websiteUrl} className="text-4xl mx-2"><FontAwesomeIcon icon={faLink} /></a>
          <a href={spot.instagram} className="text-4xl mx-2"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href={spot.facebook} className="text-4xl mx-2"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href={spot.tiktok} className="text-4xl mx-2"><FontAwesomeIcon icon={faTiktok} /></a>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); submitReview(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalRating">
              Total Rating
            </label>
            <input
              type="number"
              id="totalRating"
              name="totalRating"
              value={reviewForm.totalRating}
              onChange={handleReviewFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hygieneRating">
              Hygiene Rating
            </label>
            <input
              type="number"
              id="hygieneRating"
              name="hygieneRating"
              value={reviewForm.hygieneRating}
              onChange={handleReviewFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={reviewForm.comment}
              onChange={handleReviewFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-[#c29870] hover:bg-[#D2B48C] text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Ostavite recenziju
          </button>
        </form>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {spot.reviews.map((review, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-lg font-semibold mr-2">User {index + 1}:</span>
              <div className="flex items-center">
                <span className="mr-1">Hygiene Rating:</span>
                {[...Array(review.hygieneRating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                ))}
              </div>
              <div className="flex items-center ml-4">
                <span className="mr-1">Total Rating:</span>
                {[...Array(review.totalRating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotPage;
