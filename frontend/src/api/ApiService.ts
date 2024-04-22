
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
    hasTakeout: boolean;
    hasPosnaFood: boolean;
    reviewsCount: number;
    spotType: string;
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