import React, { useState, useEffect } from 'react';
import { 
    retrieveUnapprovedSpotsAdmin, 
    retrieveAllSpotsAdmin, 
    deleteSpotAdmin, 
    approveSpotAdmin, 
    Spot,
    deleteReviewAdmin
} from '../api/ApiService';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Link } from 'react-router-dom';

const AdminSpots: React.FC = () => {
    const [unapprovedSpots, setUnapprovedSpots] = useState<Spot[]>([]);
    const [allSpots, setAllSpots] = useState<Spot[]>([]);
    const [message, setMessage] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedMenuImages, setSelectedMenuImages] = useState<string[]>([]);
    const [reviewIdInput, setReviewIdInput] = useState<string>('');

    const handleDeleteReview = async () => {
        try {
            await deleteReviewAdmin(reviewIdInput);
            setMessage('Review deleted successfully.');
        } catch (error) {
            setMessage('Failed to delete review.');
        }
    };

    const fetchSpots = async () => {
        try {
            const unapprovedResponse = await retrieveUnapprovedSpotsAdmin();
            setUnapprovedSpots(unapprovedResponse.data);
            const allResponse = await retrieveAllSpotsAdmin();
            setAllSpots(allResponse.data);
        } catch (error) {
            setMessage('Failed to retrieve spots.');
        }
    };

    useEffect(() => {
        fetchSpots();
    }, []);

    const handleApprove = async (spotId: string) => {
        try {
            await approveSpotAdmin(spotId);
            fetchSpots();
            setMessage('Spot approved successfully.');
        } catch (error) {
            setMessage('Failed to approve spot.');
        }
    };

    const handleDelete = async (spotId: string) => {
        try {
            await deleteSpotAdmin(spotId);
            fetchSpots();
            setMessage('Spot deleted successfully.');
        } catch (error) {
            setMessage('Failed to delete spot.');
        }
    };

    const handleViewImages = (images: string[]) => {
        setSelectedImages(images);
        setSelectedMenuImages([]);
    };

    const handleViewMenuImages = (menuImages: string[]) => {
        setSelectedMenuImages(menuImages);
        setSelectedImages([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#D1A373] to-[#8B5A2B] flex flex-col items-center justify-center px-5 py-10">
        <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Delete Review by ID</h2>
                <input
                    type="text"
                    value={reviewIdInput}
                    onChange={(e) => setReviewIdInput(e.target.value)}
                    placeholder="Enter Review ID"
                    className="border border-gray-300 rounded px-3 py-2 mr-2"
                />
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={handleDeleteReview}
                >
                    Delete Review
                </button>
            </div>
            <div className="max-w-9xl w-full bg-white bg-opacity-30 rounded-lg shadow-xl p-8">
                {selectedMenuImages.length > 0 && (
                    <div className="w-full max-w-4xl mb-8">
                        <div className="max-w-md mx-auto md:mx-0 md:mr-8 mb-8 md:mb-0">
                            <h2 className="text-2xl font-semibold mb-4">Menu Images</h2>
                            <ImageGallery
                                items={selectedMenuImages.map(image => ({ original: image, thumbnail: image }))}
                                showPlayButton={false}
                                showFullscreenButton={true}
                                thumbnailPosition="bottom"
                                showThumbnails={true}
                                showBullets={true}
                            />
                            <button
                                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={() => setSelectedMenuImages([])}
                            >
                                Close Gallery
                            </button>
                        </div>
                    </div>
                )}
                {selectedImages.length > 0 && (
                    <div className="w-full max-w-4xl mb-8">
                        <div className="max-w-md mx-auto md:mx-0 md:mr-8 mb-8 md:mb-0">
                            <h2 className="text-2xl font-semibold mb-4">Spot Images</h2>
                            <ImageGallery
                                items={selectedImages.map(image => ({ original: image, thumbnail: image }))}
                                showPlayButton={false}
                                showFullscreenButton={true}
                                thumbnailPosition="bottom"
                                showThumbnails={true}
                                showBullets={true}
                            />
                            <button
                                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={() => setSelectedImages([])}
                            >
                                Close Gallery
                            </button>
                        </div>
                    </div>
                )}
                <h1 className="text-2xl font-bold mb-4">Unapproved Spots</h1>
                {message && (
                    <div className="bg-yellow-100 rounded-lg p-4 mb-4 text-yellow-800">
                        {message}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unapprovedSpots.map((spot) => (
                        <div key={spot.spotId} className="bg-white bg-opacity-50 rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold">{spot.name}</h2>
                            <p className="text-gray-700">{spot.description}</p>
                            <p className="text-gray-700">{spot.city}, {spot.address}</p>
                            <button 
                                className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
                                onClick={() => handleApprove(spot.spotId)}
                            >
                                Approve
                            </button>
                            <button 
                                className="mt-2 ml-2 bg-red-500 text-white py-2 px-4 rounded"
                                onClick={() => handleDelete(spot.spotId)}
                            >
                                Delete
                            </button>
                            <button
                                className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleViewImages(spot.images)}
                            >
                                View Images
                            </button>
                            <button
                                className="mt-2 ml-2 bg-purple-500 text-white py-2 px-4 rounded"
                                onClick={() => handleViewMenuImages(spot.menuImages)}
                            >
                                View Menu Images
                            </button>
                            <Link to={`/spot/${spot.spotId}`}>
                                <button
                                    className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    View Spot
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                <h1 className="text-2xl font-bold mt-8 mb-4">All Spots</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allSpots.map((spot) => (
                        <div key={spot.spotId} className="bg-white bg-opacity-50 rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-semibold">{spot.name}</h2>
                            <p className="text-gray-700">{spot.description}</p>
                            <p className="text-gray-700">{spot.city}, {spot.address}</p>
                            <br></br>
                            <p className="text-gray-700">Approved {spot.approved ? 'Da' : 'Ne'}</p>
                            <button
                                className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleViewImages(spot.images)}
                            >
                                View Images
                            </button>
                            <button
                                className="mt-2 ml-2 bg-purple-500 text-white py-2 px-4 rounded"
                                onClick={() => handleViewMenuImages(spot.menuImages)}
                            >
                                View Menu Images
                            </button>
                            <button
                                onClick={() => handleDelete(spot.spotId)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Delete
                            </button>
                            <Link to={`/spot/${spot.spotId}`}>
                                <button
                                    className="mt-2 ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    View Spot
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminSpots;