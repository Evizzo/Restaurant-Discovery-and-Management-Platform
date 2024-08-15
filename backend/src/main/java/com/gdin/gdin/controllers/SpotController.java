package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.enums.*;
import com.gdin.gdin.repositories.UserRepository;
import com.gdin.gdin.services.SpotService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Controller class for managing spots.
 */
@AllArgsConstructor
@RestController
@RequestMapping("spot")
public class SpotController {
    private final SpotService spotService;
    private static final Logger logger = LoggerFactory.getLogger(SpotController.class);
    private final UserRepository userRepository;

    /**
     * Retrieves a list of all spots.
     *
     * @return ResponseEntity containing a list of SpotDto objects representing all spots.
     */
    @GetMapping
    public ResponseEntity<List<SpotDto>> retrieveAllSpots(){
        return ResponseEntity.ok(spotService.retrieveAllSpots());
    }

    /**
     * Retrieves details of a specific spot by its ID.
     *
     * @param spotId The UUID of the spot to retrieve.
     * @return ResponseEntity containing the SpotDto object if found, or throws a RuntimeException if not found.
     */
    @GetMapping("/{spotId}")
    public ResponseEntity<SpotDto> retrieveSpot(@PathVariable UUID spotId){
        return spotService.findSpotById(spotId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("Spot not found" + spotId));
    }

    /**
     * Adds a new spot with associated images.
     *
     * This endpoint requires multipart form data including spot details and images.
     *
     * @param spot The Spot object containing spot details.
     * @param imageFiles List of images associated with the spot.
     * @param menuImageFiles List of menu images associated with the spot.
     * @return ResponseEntity containing the saved Spot object.
     * @throws IOException if there's an error processing the image files.
     */
    @PreAuthorize("hasAuthority('spot_owner:create')")
    @PostMapping(consumes = "multipart/form-data")
    @Transactional
    public ResponseEntity<Spot> addNewSpot(
            @Valid @ModelAttribute Spot spot,
            @RequestParam("imageFiles") List<MultipartFile> imageFiles,
            @RequestParam("menuImageFiles") List<MultipartFile> menuImageFiles
    ) throws IOException {
        Spot savedSpot = spotService.saveSpot(spot, imageFiles, menuImageFiles);
        return ResponseEntity.ok(savedSpot);
    }

    /**
     * Searches for spots based on various criteria.
     *
     * @param name Name of the spot (optional).
     * @param city City where the spot is located (optional).
     * @param workingFrom Opening time (optional).
     * @param workingTo Closing time (optional).
     * @param alwaysOpen Whether the spot is always open (optional).
     * @param childsPlayground Whether the spot has a children's playground (optional).
     * @param outdoorSeating Whether outdoor seating is available (optional).
     * @param wifiAvailable Whether WiFi is available (optional).
     * @param parking Whether parking is available (optional).
     * @param petsAllowed Whether pets are allowed (optional).
     * @param hasSpecialDietaryOptionVegetarian Whether vegetarian options are available (optional).
     * @param hasSpecialDietaryOptionVegan Whether vegan options are available (optional).
     * @param hasSpecialDietaryOptionGlutenFree Whether gluten-free options are available (optional).
     * @param hasFitnessMenu Whether a fitness menu is available (optional).
     * @param hasPosnaFood Whether posna food is available (optional).
     * @param hasBreakfast Whether breakfast is available (optional).
     * @param spotType Type of the spot (optional).
     * @param musicTypes Types of music available (optional).
     * @param ambianceTypes Types of ambiance (optional).
     * @param cuisineTypes Types of cuisine (optional).
     * @param availableActivities Available activities (optional).
     * @return ResponseEntity containing a list of SpotDto objects matching the search criteria.
     */
    @GetMapping("/search")
    public ResponseEntity<List<SpotDto>> searchSpots(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer workingFrom,
            @RequestParam(required = false) Integer workingTo,
            @RequestParam(required = false) Boolean alwaysOpen,
            @RequestParam(required = false) Boolean childsPlayground,
            @RequestParam(required = false) Boolean outdoorSeating,
            @RequestParam(required = false) Boolean wifiAvailable,
            @RequestParam(required = false) Boolean parking,
            @RequestParam(required = false) Boolean petsAllowed,
            @RequestParam(required = false) Boolean hasSpecialDietaryOptionVegetarian,
            @RequestParam(required = false) Boolean hasSpecialDietaryOptionVegan,
            @RequestParam(required = false) Boolean hasSpecialDietaryOptionGlutenFree,
            @RequestParam(required = false) Boolean hasFitnessMenu,
            @RequestParam(required = false) Boolean hasPosnaFood,
            @RequestParam(required = false) Boolean hasBreakfast,
            @RequestParam(required = false) SpotTypes spotType,
            @RequestParam(required = false) Set<MusicTypes> musicTypes,
            @RequestParam(required = false) Set<AmbianceTypes> ambianceTypes,
            @RequestParam(required = false) Set<CuisineTypes> cuisineTypes,
            @RequestParam(required = false) Set<AvailableActivities> availableActivities) {
        List<SpotDto> result = spotService.searchSpots(
                name, city, workingFrom, workingTo, alwaysOpen,
                outdoorSeating, wifiAvailable, parking,
                petsAllowed, hasSpecialDietaryOptionVegetarian, hasSpecialDietaryOptionVegan,
                hasSpecialDietaryOptionGlutenFree, hasFitnessMenu, hasPosnaFood, hasBreakfast,
                spotType, musicTypes, ambianceTypes, cuisineTypes, availableActivities, childsPlayground);

        return ResponseEntity.ok(result);
    }

    /**
     * Updates an existing spot with new details and images.
     *
     * This endpoint requires multipart form data including updated spot details and new images.
     *
     * @param spotId The UUID of the spot to be updated.
     * @param updatedSpotAtr The Spot object containing updated spot details.
     * @param newImageFiles List of new images to be associated with the spot.
     * @param newMenuImageFiles List of new menu images to be associated with the spot.
     * @return ResponseEntity containing the updated SpotDto object, or an INTERNAL_SERVER_ERROR status if an error occurs.
     * @throws IOException if there's an error processing the image files.
     */
    @PreAuthorize("hasAuthority('spot_owner:update')")
    @Transactional
    @PutMapping(path = "/{spotId}", consumes = "multipart/form-data")
    public ResponseEntity<SpotDto> updateSpot(
            @PathVariable UUID spotId,
            @Valid @ModelAttribute Spot updatedSpotAtr,
            @RequestParam("newImageFiles") List<MultipartFile> newImageFiles,
            @RequestParam("newMenuImageFiles") List<MultipartFile> newMenuImageFiles
    ) throws IOException {
    try {
        Optional<SpotDto> existingSpot = spotService.findSpotById(spotId);

        if (existingSpot == null) {
            return ResponseEntity.notFound().build();
        }

        updatedSpotAtr.setOwner(userRepository.findByEmail(existingSpot.get().getOwner().getEmail()).get());
        updatedSpotAtr.setImages(existingSpot.get().getImagesFD());
        updatedSpotAtr.setMenuImages(existingSpot.get().getMenuImagesFD());

        SpotDto updatedSpotDto = spotService.updateSpot(spotId, updatedSpotAtr, newImageFiles, newMenuImageFiles);
        return ResponseEntity.ok(updatedSpotDto);
    } catch (Exception e) {
        logger.error("Exception while updating spot with ID: " + spotId, e);
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Retrieves all spots owned by the currently authenticated user.
     *
     * @return ResponseEntity containing a list of SpotDto objects owned by the authenticated user.
     */
    @GetMapping("/owned")
    public ResponseEntity<List<SpotDto>> retrieveAllOwnerSpots(){
        return ResponseEntity.ok(spotService.getEventsByPublisherId());
    }

    /**
     * Deletes a spot by its ID.
     *
     * @param spotId The UUID of the spot to be deleted.
     * @return ResponseEntity indicating the result of the delete operation.
     */
    @PreAuthorize("hasAuthority('spot_owner:delete')")
    @DeleteMapping("/{spotId}")
    @Transactional
    public ResponseEntity<Void> deleteSpot(@PathVariable UUID spotId) {
        try {
            spotService.deleteSpot(spotId);
            return ResponseEntity.noContent().build();
        } catch (ChangeSetPersister.NotFoundException e) {
            logger.error("Spot not found with ID: " + spotId, e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error deleting spot with ID: " + spotId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
