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

import java.util.*;
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

    public SpotDto updateSpot(UUID spotId, SpotDto updatedSpotDto) {
        Optional<Spot> optionalSpot = spotRepository.findById(spotId);
        if (optionalSpot.isEmpty()) {
            return null;
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Spot existingSpot = optionalSpot.get();

        if (!Objects.equals(userEmail, existingSpot.getOwner().getEmail())){
            throw new RuntimeException("Unauthorised access.");
        }

        if (updatedSpotDto.getName() != null) {
            existingSpot.setName(updatedSpotDto.getName());
        }
        if (updatedSpotDto.getDescription() != null) {
            existingSpot.setDescription(updatedSpotDto.getDescription());
        }
        if (updatedSpotDto.getCity() != null) {
            existingSpot.setCity(updatedSpotDto.getCity());
        }
        if (updatedSpotDto.getAddress() != null) {
            existingSpot.setAddress(updatedSpotDto.getAddress());
        }
        if (updatedSpotDto.getGoogleMapsUrl() != null) {
            existingSpot.setGoogleMapsUrl(updatedSpotDto.getGoogleMapsUrl());
        }
        if (updatedSpotDto.getWebsiteUrl() != null) {
            existingSpot.setWebsiteUrl(updatedSpotDto.getWebsiteUrl());
        }
        if (updatedSpotDto.getWorkingFrom() != null) {
            existingSpot.setWorkingFrom(updatedSpotDto.getWorkingFrom());
        }
        if (updatedSpotDto.getWorkingTo() != null) {
            existingSpot.setWorkingTo(updatedSpotDto.getWorkingTo());
        }
        if (updatedSpotDto.getAlwaysOpen() != null) {
            existingSpot.setAlwaysOpen(updatedSpotDto.getAlwaysOpen());
        }
        if (updatedSpotDto.getPhoneNumber() != null) {
            existingSpot.setPhoneNumber(updatedSpotDto.getPhoneNumber());
        }
        if (updatedSpotDto.getEmail() != null) {
            existingSpot.setEmail(updatedSpotDto.getEmail());
        }
        if (updatedSpotDto.getInstagram() != null) {
            existingSpot.setInstagram(updatedSpotDto.getInstagram());
        }
        if (updatedSpotDto.getTiktok() != null) {
            existingSpot.setTiktok(updatedSpotDto.getTiktok());
        }
        if (updatedSpotDto.getFacebook() != null) {
            existingSpot.setFacebook(updatedSpotDto.getFacebook());
        }
        if (updatedSpotDto.getOutdoorSeating() != null) {
            existingSpot.setOutdoorSeating(updatedSpotDto.getOutdoorSeating());
        }
        if (updatedSpotDto.getWifiAvailable() != null) {
            existingSpot.setWifiAvailable(updatedSpotDto.getWifiAvailable());
        }
        if (updatedSpotDto.getParking() != null) {
            existingSpot.setParking(updatedSpotDto.getParking());
        }
        if (updatedSpotDto.getPetsAllowed() != null) {
            existingSpot.setPetsAllowed(updatedSpotDto.getPetsAllowed());
        }
        if (updatedSpotDto.getHasSpecialDietaryOptionVegetarian() != null) {
            existingSpot.setHasSpecialDietaryOptionVegetarian(updatedSpotDto.getHasSpecialDietaryOptionVegetarian());
        }
        if (updatedSpotDto.getHasSpecialDietaryOptionVegan() != null) {
            existingSpot.setHasSpecialDietaryOptionVegan(updatedSpotDto.getHasSpecialDietaryOptionVegan());
        }
        if (updatedSpotDto.getHasSpecialDietaryOptionGlutenFree() != null) {
            existingSpot.setHasSpecialDietaryOptionGlutenFree(updatedSpotDto.getHasSpecialDietaryOptionGlutenFree());
        }
        if (updatedSpotDto.getHasFitnessMenu() != null) {
            existingSpot.setHasFitnessMenu(updatedSpotDto.getHasFitnessMenu());
        }
        if (updatedSpotDto.getHasPosnaFood() != null) {
            existingSpot.setHasPosnaFood(updatedSpotDto.getHasPosnaFood());
        }
        if (updatedSpotDto.getHasBreakfast() != null) {
            existingSpot.setHasBreakfast(updatedSpotDto.getHasBreakfast());
        }
        if (updatedSpotDto.getSpotType() != null) {
            existingSpot.setSpotType(updatedSpotDto.getSpotType());
        }
        if (updatedSpotDto.getMusicTypes() != null) {
            existingSpot.setMusicTypes(updatedSpotDto.getMusicTypes());
        }
        if (updatedSpotDto.getAmbianceTypes() != null) {
            existingSpot.setAmbianceTypes(updatedSpotDto.getAmbianceTypes());
        }
        if (updatedSpotDto.getCuisineTypes() != null) {
            existingSpot.setCuisineTypes(updatedSpotDto.getCuisineTypes());
        }
        if (updatedSpotDto.getAvailableActivities() != null) {
            existingSpot.setAvailableActivities(updatedSpotDto.getAvailableActivities());
        }

        Spot updatedSpot = spotRepository.save(existingSpot);
        return convertToDto(updatedSpot);
    }

    public List<SpotDto> getEventsByPublisherId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Optional<User> user = userRepository.findByEmail(userEmail);
        List<Spot> spots = spotRepository.findByOwnerIdOrderByNameAsc(user.get().getId());

        return spots.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


}

