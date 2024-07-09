import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addReviewToSpot, deleteReview, dislikeReview, likeReview, retrieveSpotById, Spot, updateReview } from "../api/ApiService.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
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
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [viewMenu, setViewMenu] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        if (spotId) {
          const response = await retrieveSpotById(spotId);
          setSpot(response.data);
          setSubmitted(true)
        }
      } catch (error) {
        setMessage("Greška pri dobavljanju lokala")
      }
    };

    fetchSpot();
  }, [spotId, submitted]);

  if (!spot) {
    return <div>Učitavanje...</div>;
  }
  const handleEditReview = (reviewId: string) => {
    const reviewToEdit = spot.reviews.find(review => review.id === reviewId);
    
    if (reviewToEdit) {
      setReviewForm({
        totalRating: reviewToEdit.totalRating,
        comment: reviewToEdit.comment
      });
      setEditingReview(reviewId);
    }
  };
  
  const updateReviewHandler = async (reviewId: string) => {
    try {
      await updateReview(reviewId, {
        totalRating: reviewForm.totalRating, 
        comment: reviewForm.comment 
      });
      const updatedSpotResponse = await retrieveSpotById(spot.spotId);
      setSpot(updatedSpotResponse.data);
      setEditingReview(null);
      setReviewForm({ totalRating: 0, comment: "" });
      setMessage("Recenzija je uspešno izmenjena.");
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  const images = spot.images.map(image => ({
    original: image,
    thumbnail: image,
  }));

  const menuImages = spot.menuImages.map(image => ({
    original: image,
    thumbnail: image,
  }));

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
        setSubmitted(false)
        setMessage("Uspešno ste postavili recenziju !")
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Došlo je do greške, osvežite stranicu.");
      }    
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
    }
  };

  const handleDislike = async (reviewId: string) => {
    try {
      await dislikeReview(reviewId);
      const updatedSpotResponse = await retrieveSpotById(spot.spotId);
      setSpot(updatedSpotResponse.data);
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col items-center justify-center px-5 py-10">
      <div className={`${isMobile ? 'max-w-4xl w-full bg-white bg-opacity-30 rounded-lg shadow-xl p-8' : 'max-w-9xl w-full bg-white bg-opacity-30 rounded-lg shadow-xl p-8'}`}>
        <div className="flex flex-col md:flex-row">
        <div className="container mt-4">
        <div className={`container mt-4 ${isMobile ? 'flex justify-center' : ''}`}> 
          <div className="inline-block bg-white bg-opacity-50 rounded-lg shadow-md py-2 px-4 mb-4">
            <span className={`cursor-pointer mr-4 ${!viewMenu ? 'underline' : ''}`} onClick={() => setViewMenu(false)}>Ambijent</span>
            <span className={`cursor-pointer ${viewMenu ? 'underline' : ''}`} onClick={() => setViewMenu(true)}>Meni</span> 
          </div>
        </div>
          <div className="max-w-md mx-auto md:mx-0 md:mr-8 mb-8 md:mb-0">
            <ImageGallery items={viewMenu ? menuImages : images} showPlayButton={false} showFullscreenButton={true} />
          </div>
        </div>
          <br></br>
        <div className="md:flex-grow">
          <h1 className="font-semibold text-4xl text-gray-800 mb-4">{spot.name} ({spot.reviewsCount})</h1>
          <p style={{ maxWidth: '700px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            {spot.description}
          </p>
          <div className="flex items-center mb-6">
            <p className="text-lg text-gray-700 mr-2">Ocena:</p>
            <ShowStarRating
              key={spot.totalReview}
              maxStars={5}
              initialRating={spot.totalReview}
            />
          </div>
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
              <strong>Telefon:</strong> {spot.phoneNumber}
            </p>
            <p className="text-lg mb-4">
              <strong>Radno vreme:</strong>{" "}
              {spot.alwaysOpen ? "24/7" : `${spot.workingFrom} - ${spot.workingTo}`}
            </p>
          </div>
          <div className={`${isMobile ? '' : 'border-r border-gray-300 pr-4'}`}>
          <p className="text-lg mb-4">
            <strong>Tipovi muzike:</strong> {spot.musicTypes.length > 0 ? toNormalCase(spot.musicTypes.join(", ")) : "Nema informacija"}
            </p>
            <p className="text-lg mb-4">
              <strong>Tipovi ambijenta:</strong> {spot.ambianceTypes.length > 0 ? toNormalCase(spot.ambianceTypes.join(", ")) : "Nema informacija"}
            </p>
            <p className="text-lg mb-4">
              <strong>Tipovi kuhinje:</strong> {spot.cuisineTypes.length > 0 ? toNormalCase(spot.cuisineTypes.join(", ")) : "Nema informacija"}
            </p>
            <p className="text-lg mb-4">
              <strong>Dostupne aktivnosti:</strong> {spot.availableActivities.length > 0 ? toNormalCase(spot.availableActivities.join(", ")) : "Nema informacija"}
            </p>
          </div>
          <div>
            <p className="text-lg mb-4">
              <strong>Parking:</strong> {spot.parking ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Dozvoljeni ljubmici:</strong> {spot.petsAllowed ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Vegetarijanska hrana:</strong> {spot.hasSpecialDietaryOptionVegetarian ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Veganska hrana:</strong> {spot.hasSpecialDietaryOptionVegan ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Hrana bez glutena:</strong> {spot.hasSpecialDietaryOptionGlutenFree ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
             <strong>Fitnes meni:</strong> {spot.hasFitnessMenu ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Posna hrana:</strong> {spot.hasPosnaFood ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Doručak:</strong> {spot.hasBreakfast ? "Da" : "Ne"}
            </p>
            <p className="text-lg mb-4">
              <strong>Igralište za decu:</strong> {spot.childsPlayground ? "Da" : "Ne"}
            </p>
          </div>
        </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          {spot.instagram && (
            <a href={spot.instagram} className="text-4xl mx-2" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {spot.facebook && (
            <a href={spot.facebook} className="text-4xl mx-2" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          )}
          {spot.tiktok && (
            <a href={spot.tiktok} className="text-4xl mx-2" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          )}
          {spot.googleMapsUrl && (
          <a href={spot.googleMapsUrl} className="text-4xl mx-2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </a>
        )}
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
            {authContext.role === 'ADMIN' && ( <p className="text-gray-700" style={{ wordWrap: 'break-word' }}><strong>{review.id}</strong></p>)}
            {editingReview === review.id && (
              <div>
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
                  onClick={() => updateReviewHandler(review.id)}
                  className="bg-[#c29870] hover:bg-[#D2B48C] text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sačuvaj izmene
                </button>
              </div>
            )}
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
              <button className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleEditReview(review.id)}>
                Izmenite
              </button>
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
