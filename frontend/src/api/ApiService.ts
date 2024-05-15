
import {apiClient} from './ApiClient.ts'; 

export interface Spot {
    spotId: string;
    name: string;
    description: string;
    city: string;
    address: string;
    googleMapsUrl: string;
    websiteUrl: string;
    workingFrom: number;
    workingTo: number;
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
    reviews: Review[];
    totalReview: number;
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

export interface SearchParams {
    [key: string]: string | number | boolean | string[] | number[] | boolean[] | undefined;
    name?: string;
    city?: string;
    workingFrom?: number;
    workingTo?: number;
    alwaysOpen?: boolean;
    outdoorSeating?: boolean;
    wifiAvailable?: boolean;
    parking?: boolean;
    petsAllowed?: boolean;
    hasSpecialDietaryOptionVegetarian?: boolean;
    hasSpecialDietaryOptionVegan?: boolean;
    hasSpecialDietaryOptionGlutenFree?: boolean;
    hasFitnessMenu?: boolean;
    hasPosnaFood?: boolean;
    hasBreakfast?: boolean;
    spotType?: string;
    musicTypes?: string[];
    ambianceTypes?: string[];
    cuisineTypes?: string[];
    availableActivities?: string[];
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

export const searchSpots = (params: SearchParams) => {
    return apiClient.get('/spot/search', { params });
  };
  
export const updateReview = (reviewId: string, updatedReview: any) => {
    return apiClient.put(`/review/${reviewId}`, updatedReview);
};

export const updateSpot = (spotId: string, updatedSpot: any) => {
    return apiClient.put(`/spot/${spotId}`, updatedSpot);
  };