package com.gdin.gdin.services;

import com.gdin.gdin.config.SpotSpecification;
import com.gdin.gdin.dtos.ReviewDto;
import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.dtos.UserDto;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.entities.User;
import com.gdin.gdin.enums.*;
import com.gdin.gdin.repositories.SpotRepository;
import com.gdin.gdin.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class SpotService {
    private final SpotRepository spotRepository;
    private final ReviewService reviewService;
    private final UserRepository userRepository;
    private final UserService userService;
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
        UserDto owner = userService.convertToDto(spot.getOwner());

        return SpotDto.builder()
                .spotId(spot.getSpotId())
                .name(spot.getName())
                .description(spot.getDescription())
                .city(spot.getCity())
                .address(spot.getAddress())
                .googleMapsUrl(spot.getGoogleMapsUrl())
                .websiteUrl(spot.getWebsiteUrl())
                .workingFrom(spot.getWorkingFrom())
                .workingTo(spot.getWorkingTo())
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
                .hasPosnaFood(spot.getHasPosnaFood())
                .spotType(spot.getSpotType())
                .musicTypes(spot.getMusicTypes())
                .ambianceTypes(spot.getAmbianceTypes())
                .cuisineTypes(spot.getCuisineTypes())
                .availableActivities(spot.getAvailableActivities())
                .reviewsCount(spot.getReviewsCount())
                .hasBreakfast(spot.getHasBreakfast())
                .reviews(reviews)
                .owner(owner)
                .totalReview(spot.getTotalReview())
//                .reviews(spot.getReviews().stream()
//                        .map(reviewService::convertReviewToDto)
//                        .collect(Collectors.toSet()))
                .build();
    }

    public Spot saveSpot(Spot spot){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Optional<User> user = userRepository.findByEmail(userEmail);

        spot.setReviewsCount(0);
        spot.setTotalReview(0);
        user.ifPresent(spot::setOwner);

        return spotRepository.save(spot);
    }

    public List<SpotDto> searchSpots(
            String name,
            String city,
            Integer workingFrom,
            Integer workingTo,
            Boolean alwaysOpen,
            Boolean outdoorSeating,
            Boolean wifiAvailable,
            Boolean parking,
            Boolean petsAllowed,
            Boolean hasSpecialDietaryOptionVegetarian,
            Boolean hasSpecialDietaryOptionVegan,
            Boolean hasSpecialDietaryOptionGlutenFree,
            Boolean hasFitnessMenu,
            Boolean hasPosnaFood,
            Boolean hasBreakfast,
            SpotTypes spotType,
            Set<MusicTypes> musicTypes,
            Set<AmbianceTypes> ambianceTypes,
            Set<CuisineTypes> cuisineTypes,
            Set<AvailableActivities> availableActivities) {

        Specification<Spot> spec = SpotSpecification.searchSpot(
                name, city, workingFrom, workingTo, alwaysOpen,
                outdoorSeating, wifiAvailable, parking,
                petsAllowed, hasSpecialDietaryOptionVegetarian, hasSpecialDietaryOptionVegan,
                hasSpecialDietaryOptionGlutenFree, hasFitnessMenu, hasPosnaFood, hasBreakfast,
                spotType, musicTypes, ambianceTypes, cuisineTypes, availableActivities);

        List<Spot> spots = spotRepository.findAll(spec);

        return spots.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
