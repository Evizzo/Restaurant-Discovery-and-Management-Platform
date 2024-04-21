package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.ReviewDto;
import com.gdin.gdin.entities.Review;
import com.gdin.gdin.services.ReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("review")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/{spotId}")
    public ResponseEntity<Review> saveReview(@Valid @RequestBody Review review, @PathVariable UUID spotId){
        return ResponseEntity.ok(reviewService.saveReview(review, spotId));
    }

    @GetMapping("/{spotId}")
    public ResponseEntity<List<ReviewDto>> getAllReviewsForSpot(@PathVariable UUID spotId, @RequestParam String sortCriteria){
        return ResponseEntity.ok(reviewService.getAllReviewsForSpot(spotId, sortCriteria));
    }
}
