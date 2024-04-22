package com.gdin.gdin.services;

import com.gdin.gdin.dtos.ReviewDto;
import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.repositories.SpotRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SpotService {
    private final SpotRepository spotRepository;
    private final ReviewService reviewService;

    public List<SpotDto> retrieveAllSpots(){
        return spotRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    public Optional<SpotDto> findSpotById(UUID spotId){
        return spotRepository.findById(spotId)
                .map(this::convertToDto);
    }

    public SpotDto convertToDto(Spot spot) {
        List<ReviewDto> reviews = reviewService.getAllReviewsForSpot(spot.getSpotId(), null);

        return SpotDto.builder()
                .spotId(spot.getSpotId())
                .name(spot.getName())
                .description(spot.getDescription())
                .city(spot.getCity())
                .address(spot.getAddress())
                .googleMapsUrl(spot.getGoogleMapsUrl())
                .websiteUrl(spot.getWebsiteUrl())
                .workingHours(spot.getWorkingHours())
                .alwaysOpen(spot.getAlwaysOpen())
                .phoneNumber(spot.getPhoneNumber())
                .email(spot.getEmail())
                .instagram(spot.getInstagram())
                .tiktok(spot.getTiktok())
                .facebook(spot.getFacebook())
                .outdoorSeating(spot.getOutdoorSeating())
                .wifiAvailable(spot.getWifiAvailable())
                .parking(spot.getParking())
                .petsAllowed(spot.getPetsAllowed())
                .hasSpecialDietaryOptionVegetarian(spot.getHasSpecialDietaryOptionVegetarian())
                .hasSpecialDietaryOptionVegan(spot.getHasSpecialDietaryOptionVegan())
                .hasSpecialDietaryOptionGlutenFree(spot.getHasSpecialDietaryOptionGlutenFree())
                .hasFitnessMenu(spot.getHasFitnessMenu())
                .hasTakeout(spot.getHasTakeout())
                .hasPosnaFood(spot.getHasPosnaFood())
                .spotType(spot.getSpotType())
                .musicTypes(spot.getMusicTypes())
                .ambianceTypes(spot.getAmbianceTypes())
                .cuisineTypes(spot.getCuisineTypes())
                .availableActivities(spot.getAvailableActivities())
                .specialties(spot.getSpecialties())
                .reviewsCount(spot.getReviewsCount())
                .reviews(reviews)
//                .reviews(spot.getReviews().stream()
//                        .map(reviewService::convertReviewToDto)
//                        .collect(Collectors.toSet()))
                .build();
    }
}
