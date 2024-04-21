package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.services.SpotService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
