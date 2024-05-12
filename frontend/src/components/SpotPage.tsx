import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addReviewToSpot, deleteReview, dislikeReview, likeReview, retrieveSpotById, Spot } from "../api/ApiService.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import StarRating from './StarRating.tsx';
import { useAuth } from "../api/AuthContex";
import { useMediaQuery } from "react-responsive";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as solidThumbsUp, faThumbsDown as solidThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp, faThumbsDown as regularThumbsDown } from '@fortawesome/free-regular-svg-icons';
import ShowStarRating from "./ShowStarRating.tsx";

interface SpotPageProps {}

const SpotPage: React.FC<SpotPageProps> = () => {
  const { spotId } = useParams<{ spotId?: string }>();
  const [spot, setSpot] = useState<Spot | null>(null);
  const authContext = useAuth();
  const [charCount, setCharCount] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    totalRating: 0,
    comment: ""
  });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [message,setMessage] = useState("")

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
    setReviewForm({ ...reviewForm, [name]: value});
    setCharCount(value.length);
  };

  const submitReview = async () => {
    try {
      await addReviewToSpot(spot.spotId, reviewForm);
        const updatedSpotResponse = await retrieveSpotById(spot.spotId);
        setSpot(updatedSpotResponse.data);
        setReviewForm({ totalRating: 0, comment: "" });
        setCharCount(0)
        setMessage("Uspešno ste postavili recenziju !")
    } catch (error: any) {
      setMessage(error.response.data.message)
    }
  };

  const handleRatingChange = (rating: any, field: any) => {
    setReviewForm({ ...reviewForm, [field]: rating });
  };

  const toNormalCase = (str: string) => {
    return str.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
        const updatedSpotResponse = await retrieveSpotById(spot.spotId);
        setSpot(updatedSpotResponse.data);
        setMessage("Recenzija je uspešno obrisana.")
    } catch (error: any) {
      setMessage(error.response.data.message)
    }
  }

  const handleLike = async (reviewId: string) => {
    try {
      await likeReview(reviewId);
      const updatedSpotResponse = await retrieveSpotById(spot.spotId);
      setSpot(updatedSpotResponse.data);
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId: string) => {
    try {
      await dislikeReview(reviewId);
      const updatedSpotResponse = await retrieveSpotById(spot.spotId);
      setSpot(updatedSpotResponse.data);
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col items-center justify-center px-5 py-10">
      <div className={`${isMobile ? 'max-w-4xl w-full bg-white bg-opacity-30 rounded-lg shadow-xl p-8' : 'max-w-9xl w-full bg-white bg-opacity-30 rounded-lg shadow-xl p-8'}`}>
        <div className="flex flex-col md:flex-row">
        <div className={`${isMobile ? 'mt-8' : 'max-w-md mx-auto md:mx-0 md:mr-8 mb-8 md:mb-0'}`}>
            <ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} />
          </div>
          <br></br>
          <div className="md:flex-grow">
            <h1 className="font-semibold text-4xl text-gray-800 mb-4">{spot.name} ({spot.reviewsCount})</h1>
            <p className="text-lg text-gray-700 mb-6">{spot.description}</p>
            <p className="text-lg text-gray-700 mb-6">Rating: </p> <ShowStarRating
              key={spot.totalReview}
            maxStars={5}
            initialRating={spot.totalReview}
          />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
        <div className={`${isMobile ? '' : 'border-r border-gray-300 pr-4'}`}>
            <p className="text-lg mb-4">
              <strong>Tip:</strong> {toNormalCase(spot.spotType)}
            </p>
            <p className="text-lg mb-4">
              <strong>Lokacija:</strong> {spot.city}, {spot.address}
            </p>
            <p className="text-lg mb-4">
              <strong>Tpelefon:</strong> {spot.phoneNumber}
            </p>
            <p className="text-lg mb-4">
              <strong>Radno vreme:</strong>{" "}
              {spot.alwaysOpen ? "24/7" : `${spot.workingFrom} - ${spot.workingTo}`}
            </p>
          </div>
          <div className={`${isMobile ? '' : 'border-r border-gray-300 pr-4'}`}>
            <p className="text-lg mb-4">
              <strong>Tipovi muzike:</strong> {toNormalCase(spot.musicTypes.join(", "))}
            </p>
            <p className="text-lg mb-4">
              <strong>Tipovi ambijenta:</strong> {toNormalCase(spot.ambianceTypes.join(", "))}
            </p>
            <p className="text-lg mb-4">
              <strong>Tipovi kuhinje:</strong> {toNormalCase(spot.cuisineTypes.join(", "))}
            </p>
            <p className="text-lg mb-4">
              <strong>Dostupne aktivnosti:</strong> {toNormalCase(spot.availableActivities.join(", "))}
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
            <p className="text-lg mb-4">
              Posna hrana: {spot.hasPosnaFood ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              Doručak: {spot.hasBreakfast ? "Da" : "Ne"}
            </p>
          </div>
        </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <a href={spot.websiteUrl} className="text-4xl mx-2"><FontAwesomeIcon icon={faLink} /></a>
          <a href={spot.instagram} className="text-4xl mx-2"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href={spot.facebook} className="text-4xl mx-2"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href={spot.tiktok} className="text-4xl mx-2"><FontAwesomeIcon icon={faTiktok} /></a>
        </div>
        {authContext.isAuthenticated && <form onSubmit={(e) => { e.preventDefault(); submitReview(); }}>
          <br></br>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalRating">
            Ocenite:
          </label>
          <StarRating
            key={reviewForm.totalRating}
            maxStars={5}
            initialRating={reviewForm.totalRating}
            onChange={(rating: any) => handleRatingChange(rating, 'totalRating')}
          />
        </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              Komentar:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={reviewForm.comment}
              onChange={handleReviewFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="text-right mt-1">{charCount}/720</div>
          </div>
          <button
            type="submit"
            className="bg-[#c29870] hover:bg-[#D2B48C] text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Ostavite recenziju
          </button>
        </form>}
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
        <h2 className="text-2xl font-semibold mb-4">Recenzije</h2>
        {spot.reviews.map((review, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <img src={review.reviewer.pictureUrl} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              <div>
                <span className="text-lg font-semibold">{review.reviewer.firstname} {review.reviewer.lastname}</span>
                <div className="flex items-center">
                  <span className="mr-1">Ocena:</span>
                  {[...Array(review.totalRating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={solidStar} />
                  ))}
                  {[...Array(5-review.totalRating)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={regularStar} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700" style={{ wordWrap: 'break-word' }}>{review.comment}</p>
            <div className="flex items-center mt-2">
              <button className="mr-2" onClick={() => handleLike(review.id)}>
                <FontAwesomeIcon icon={review.likedByUsers.includes(authContext.email) ? solidThumbsUp : regularThumbsUp} />
              </button>
              <span>{review.likes}</span>
              <button className="ml-2" onClick={() => handleDislike(review.id)}>
                <FontAwesomeIcon icon={review.dislikedByUsers.includes(authContext.email) ? solidThumbsDown : regularThumbsDown} />
              </button>
              <span className="ml-2">{review.dislikes}</span>
            </div>
            <br></br>
            {authContext.isAuthenticated && authContext.email === review.reviewer.email && (
            <div className="btn-group">
              {/* <button className="btn btn-sm btn-info" onClick={() => handleEditComment(comment.id)}>
                Izmeni
              </button> */}
              <button className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDeleteReview(review.id)}>
                Obriši
              </button>
            </div>
          )}
            <br></br>
            <hr></hr>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotPage;
