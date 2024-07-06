package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.SpotDto;
import com.gdin.gdin.services.AdminService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("admin")
public class AdminController {
    private final AdminService adminService;

    @PutMapping("/spot/approve/{spotId}")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<SpotDto> approveSpot(@PathVariable UUID spotId) {
        SpotDto approvedSpot = adminService.approveSpot(spotId);
        if (approvedSpot != null) {
            return ResponseEntity.ok(approvedSpot);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/spot/unapproved")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<SpotDto>> retrieveUnapprovedSpots() {
        List<SpotDto> unapprovedSpots = adminService.retrieveUnapprovedSpots();
        return ResponseEntity.ok(unapprovedSpots);
    }

    @GetMapping("/spot/all")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<SpotDto>> retrieveAllSpots() {
        List<SpotDto> allSpots = adminService.retrieveAllSpots();
        return ResponseEntity.ok(allSpots);
    }

    @DeleteMapping("/spot/{spotId}")
    @Transactional
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<Void> deleteSpot(@PathVariable UUID spotId) {
        try {
            adminService.deleteSpot(spotId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/review/{reviewId}")
    @Transactional
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<String> deleteReview(@PathVariable UUID reviewId) {
        adminService.deleteReviewById(reviewId);
        return ResponseEntity.ok("Review successfully deleted.");
    }

}