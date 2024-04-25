package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.services.SpotService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    @PostMapping
    public ResponseEntity<Spot> addNewSpot(@Valid @RequestBody Spot spot){
        return ResponseEntity.ok(spotService.saveSpot(spot));
    }

}
