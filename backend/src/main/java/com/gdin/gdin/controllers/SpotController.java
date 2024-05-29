package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.enums.*;
import com.gdin.gdin.repositories.UserRepository;
import com.gdin.gdin.services.SpotService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
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

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.PropertyDescriptor;

@AllArgsConstructor
@RestController
@RequestMapping("spot")
public class SpotController {
    private final SpotService spotService;
    private static final Logger logger = LoggerFactory.getLogger(SpotController.class);
    private final UserRepository userRepository;
    @GetMapping
    public ResponseEntity<List<SpotDto>> retrieveAllSpots(){
        return ResponseEntity.ok(spotService.retrieveAllSpots());
    }

    @GetMapping("/{spotId}")
    public ResponseEntity<SpotDto> retrieveSpot(@PathVariable UUID spotId){
        return spotService.findSpotById(spotId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("Spot not found" + spotId));
    }

    @PreAuthorize("hasAuthority('spot_owner:create')")
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Spot> addNewSpot(
            @Valid @ModelAttribute Spot spot,
            @RequestParam("imageFiles") List<MultipartFile> imageFiles,
            @RequestParam("menuImageFiles") List<MultipartFile> menuImageFiles
    ) throws IOException {
        Spot savedSpot = spotService.saveSpot(spot, imageFiles, menuImageFiles);
        return ResponseEntity.ok(savedSpot);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SpotDto>> searchSpots(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer workingFrom,
            @RequestParam(required = false) Integer workingTo,
            @RequestParam(required = false) Boolean alwaysOpen,
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
                spotType, musicTypes, ambianceTypes, cuisineTypes, availableActivities);

        return ResponseEntity.ok(result);
    }

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

    @GetMapping("/owned")
    public ResponseEntity<List<SpotDto>> retrieveAllOwnerSpots(){
        return ResponseEntity.ok(spotService.getEventsByPublisherId());
    }

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
