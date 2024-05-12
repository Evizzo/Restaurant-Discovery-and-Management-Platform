package com.gdin.gdin.entities;

import com.gdin.gdin.enums.*;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID spotId;

    private String name;
    private String description;
    private String city;
    private String address;
    private String googleMapsUrl;
    private String websiteUrl;
    private int workingFrom;
    private int workingTo;
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
    private int totalReview;

    @Enumerated(EnumType.STRING)
    private SpotTypes spotType;

    @ElementCollection(targetClass = MusicTypes.class)
    @Enumerated(EnumType.STRING)
    private Set<MusicTypes> musicTypes;

    @ElementCollection(targetClass = AmbianceTypes.class)
    @Enumerated(EnumType.STRING)
    private Set<AmbianceTypes> ambianceTypes;

    @ElementCollection(targetClass = CuisineTypes.class)
    @Enumerated(EnumType.STRING)
    private Set<CuisineTypes> cuisineTypes;

    @ElementCollection(targetClass = AvailableActivities.class)
    @Enumerated(EnumType.STRING)
    private Set<AvailableActivities> availableActivities;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "spot_id")
    private List<Review> reviews;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}