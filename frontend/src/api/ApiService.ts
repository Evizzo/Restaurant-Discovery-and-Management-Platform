
import {apiClient} from './ApiClient.ts'; 

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
    hasPosnaFood: boolean;
    reviewsCount: number;
    spotType: string;
    hasBreakfast: boolean;
    musicTypes: string[];
    ambianceTypes: string[];
    cuisineTypes: string[];
    availableActivities: string[];
    specialties: string[];
    reviews: Review[];
  }

  export interface Review {
    id: string;
    totalRating: number;
    comment: string;
    isEdited: boolean;
    date: Date;
    reviewer: User;
    likes: number;
    dislikes: number;
    likedByUsers: string[];
    dislikedByUsers: string[];
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    provider: string;
    pictureUrl: string;
}

export const retrieveAllSpots = () => 
    apiClient.get(`/spot`)

export const retrieveSpotById = (spotId: string) => 
    apiClient.get(`/spot/${spotId}`)

export const executeGoogleLogin = () => 
    apiClient.get(`/authenticate/google/userdetails`)

export const executeLogout = () => {
    return apiClient.post(`/authenticate/logout`);
}

export const addReviewToSpot = (spotId: string, review: any) => {
    return apiClient.post(`/review/${spotId}`, review);
}

export const getAllReviewsForSpot = (spotId: string) => {
    return apiClient.get(`/review/${spotId}`);
}

export const deleteReview = (reviewId: string) => {
    return apiClient.delete(`/review/${reviewId}`);
};

export const likeReview = (reviewId: string) => {
    return apiClient.put(`/review/${reviewId}/like`);
};

export const dislikeReview = (reviewId: string) => {
    return apiClient.put(`/review/${reviewId}/dislike`);
};

export const addSpot = (spot: any) => {
    return apiClient.post(`/spot`, spot);
}