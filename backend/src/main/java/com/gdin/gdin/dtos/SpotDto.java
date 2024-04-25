package com.gdin.gdin.dtos;

import com.gdin.gdin.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpotDto {
    private UUID spotId;

    private String name;
    private String description;
    private String city;
    private String address;
    private String googleMapsUrl;
    private String websiteUrl;
    private String workingHours;
    private Boolean alwaysOpen;
    private String phoneNumber;
    private String email;
    private String instagram;
    private String tiktok;
    private String facebook;
    private Boolean outdoorSeating;
    private Boolean wifiAvailable;
    private Boolean parking;
    private Boolean petsAllowed;
    private Boolean hasSpecialDietaryOptionVegetarian;
    private Boolean hasSpecialDietaryOptionVegan;
    private Boolean hasSpecialDietaryOptionGlutenFree;
    private Boolean hasFitnessMenu;
    private Boolean hasPosnaFood;
    private Boolean hasBreakfast;
    private int reviewsCount;
    private SpotTypes spotType;
    private Set<MusicTypes> musicTypes;
    private Set<AmbianceTypes> ambianceTypes;
    private Set<CuisineTypes> cuisineTypes;
    private Set<AvailableActivities> availableActivities;
    private Set<String> specialties;
    private List<ReviewDto> reviews;
    private UserDto owner;
}
