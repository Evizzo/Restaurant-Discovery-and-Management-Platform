package com.gdin.gdin.entities;

import com.gdin.gdin.enums.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @Size(min = 1, message = "Naziv ne može biti prazan")
    private String name;

    @Column(length = 1000)
    @Size(min = 1, message = "Opis ne može biti prazan")
    private String description;

    @Size(min = 1, message = "Grad ne može biti prazan")
    private String city;

    @Size(min = 1, message = "Adresa ne može biti prazna")
    private String address;

    private String googleMapsUrl;

    private String websiteUrl;

    private String workingFrom;

    private String workingTo;

    private Boolean alwaysOpen;

    @Size(min = 1, message = "Broj telefona ne može biti prazan")
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

    private Boolean approved;

    @NotNull(message = "Fotografije ne mogu biti prazne")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "spot_id")
    private List<FileData> images = new ArrayList<>();

    @NotNull(message = "Fotografije menija ne mogu biti prazne")
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "spot_id_for_menu")
    private List<FileData> menuImages = new ArrayList<>();;

    @NotNull(message = "Tip lokala ne može biti prazan")
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

    public void addImage(FileData fileData) {
        this.images.add(fileData);
    }

    public void addMenuImage(FileData fileData) {
        this.menuImages.add(fileData);
    }

    public void removeImage(FileData fileData) {
        this.images.remove(fileData);
    }

    public void removeMenuImage(FileData fileData) {
        this.menuImages.remove(fileData);
    }
}