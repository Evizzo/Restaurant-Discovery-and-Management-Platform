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

/**
 * Controller class for handling administrative operations.
 */
@AllArgsConstructor
@RestController
@RequestMapping("admin")
public class AdminController {
    private final AdminService adminService;

    /**
     * Approves a spot by its ID.
     *
     * This endpoint allows an admin to approve a spot. Access is restricted to users
     * with the 'admin:update' authority.
     *
     * @param spotId The UUID of the spot to be approved.
     * @return ResponseEntity containing the approved SpotDto if the spot is found and approved,
     *         or a 404 Not Found if the spot does not exist.
     */
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

    /**
     * Retrieves all unapproved spots.
     *
     * This endpoint returns a list of all spots that have not yet been approved by an admin.
     * Access is restricted to users with the 'admin:read' authority.
     *
     * @return ResponseEntity containing a list of SpotDto objects representing unapproved spots.
     */
    @GetMapping("/spot/unapproved")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<SpotDto>> retrieveUnapprovedSpots() {
        List<SpotDto> unapprovedSpots = adminService.retrieveUnapprovedSpots();
        return ResponseEntity.ok(unapprovedSpots);
    }

    /**
     * Retrieves all spots.
     *
     * This endpoint returns a list of all spots in the system. Access is restricted to users
     * with the 'admin:read' authority.
     *
     * @return ResponseEntity containing a list of SpotDto objects representing all spots.
     */
    @GetMapping("/spot/all")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<SpotDto>> retrieveAllSpots() {
        List<SpotDto> allSpots = adminService.retrieveAllSpots();
        return ResponseEntity.ok(allSpots);
    }

    /**
     * Deletes a spot by its ID.
     *
     * This endpoint allows an admin to delete a spot from the system. Access is restricted
     * to users with the 'admin:delete' authority.
     *
     * @param spotId The UUID of the spot to be deleted.
     * @return ResponseEntity with status 204 No Content if the spot is successfully deleted,
     *         or 404 Not Found if the spot does not exist.
     */
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

    /**
     * Deletes a review by its ID.
     *
     * This endpoint allows an admin to delete a review from the system. Access is restricted
     * to users with the 'admin:delete' authority.
     *
     * @param reviewId The UUID of the review to be deleted.
     * @return ResponseEntity with a success message if the review is successfully deleted.
     */
    @DeleteMapping("/review/{reviewId}")
    @Transactional
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<String> deleteReview(@PathVariable UUID reviewId) {
        adminService.deleteReviewById(reviewId);
        return ResponseEntity.ok("Review successfully deleted.");
    }

}