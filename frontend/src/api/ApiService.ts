import {apiClient} from './ApiClient.ts'; 

export interface Spot {
    spotId: string;
    name: string;
    description: string;
    city: string;
    address: string;
    googleMapsUrl: string;
    websiteUrl: string;
    workingFrom: string;
    workingTo: string;
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
    images: string[];
    menuImages: string[];
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
    workingFrom?: string;
    workingTo?: string;
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

export const searchSpots = (params: SearchParams) => {
    return apiClient.get('/spot/search', { params });
  };
  
export const updateReview = (reviewId: string, updatedReview: any) => {
    return apiClient.put(`/review/${reviewId}`, updatedReview);
};
  
export const retrieveAllOwnerSpots = () => {
    return apiClient.get(`/spot/owned`);
}

export const addSpot = (spot: any, imageFiles: any, menuImageFiles: any) => {
    const formData = new FormData();
    Object.keys(spot).forEach(key => {
        formData.append(key, spot[key]);
    });
    for (let i = 0; i < imageFiles.length; i++) {
        formData.append('imageFiles', imageFiles[i]);
    }
    for (let i = 0; i < menuImageFiles.length; i++) {
        formData.append('menuImageFiles', menuImageFiles[i]);
    }
    return apiClient.post(`/spot`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteSpot = (spotId: string) => {
    return apiClient.delete(`/spot/${spotId}`);
};

export const updateSpot = async (spotId: string, updatedSpot: any, newImageFiles: File[], newMenuImageFiles: File[]) => {
    try {
        const existingSpotResponse = await retrieveSpotById(spotId);
        const existingSpot = existingSpotResponse.data;

        const formData = new FormData();

        const excludedFields = ['owner', 'reviews', 'imagesFD', 'menuImagesFD'];

        const areArraysEqual = (arr1: any[], arr2: any[]) => {
            if (arr1.length !== arr2.length) return false;
            return arr1.every((value, index) => value === arr2[index]);
        };

        Object.keys(updatedSpot).forEach(key => {
            if (excludedFields.includes(key)) return;

            const newValue = updatedSpot[key];
            const oldValue = existingSpot[key];

            if (Array.isArray(newValue) && Array.isArray(oldValue)) {
                if (!areArraysEqual(newValue, oldValue)) {
                    formData.append(key, JSON.stringify(newValue));
                }
            } else if (newValue !== oldValue) {
                formData.append(key, newValue);
            }
        });

        // const existingImagesAsFiles = existingSpot.imagesFD.map((image: any) => {
        //     const file = new File([image.data], image.name, { type: image.type });
        //     return file;
        // });

        // const existingMenuImagesAsFiles = existingSpot.menuImagesFD.map((menuImage: any) => {
        //     const file = new File([menuImage.data], menuImage.name, { type: menuImage.type });
        //     return file;
        // });

        // existingImagesAsFiles.forEach((file: any) => { // TODO Ovo prebaci u updatespot, da se tamo prebace objekti slika u file format
        //     formData.append('newImageFiles', file);
        // });

        // existingMenuImagesAsFiles.forEach((file: any) => {
        //     formData.append('newMenuImageFiles', file);
        // });

        if (newImageFiles && newImageFiles.length > 0) { // TODO Sad se 2x dodaju slike, ali se izbrisu IZGLEDA...
            newImageFiles.forEach((file) => {
                formData.append('newImageFiles', file);
            });
        }

        if (newMenuImageFiles && newMenuImageFiles.length > 0) {
            newMenuImageFiles.forEach((file) => {
                formData.append('newMenuImageFiles', file);
            });
        }

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1] instanceof Blob ? pair[1].name : pair[1]}`);
        }

        return apiClient.put(`/spot/${spotId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error("Error updating spot:", error);
        throw error;
    }
};
