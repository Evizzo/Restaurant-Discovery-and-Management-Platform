package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.enums.*;
import com.gdin.gdin.services.SpotService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("spot")
public class SpotController {
    private final SpotService spotService;

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
            @RequestParam("imageFiles") List<MultipartFile> imageFiles) throws IOException {
        Spot savedSpot = spotService.saveSpot(spot, imageFiles);
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
    @PutMapping("/{spotId}")
    public ResponseEntity<SpotDto> updateSpot(@PathVariable UUID spotId, @Valid @RequestBody SpotDto updatedSpotDto) {
        SpotDto updatedSpot = spotService.updateSpot(spotId, updatedSpotDto);
        if (updatedSpot != null) {
            return ResponseEntity.ok(updatedSpot);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/owned")
    public ResponseEntity<List<SpotDto>> retrieveAllOwnerSpots(){
        return ResponseEntity.ok(spotService.getEventsByPublisherId());
    }

}
