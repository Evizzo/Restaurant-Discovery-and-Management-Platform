package com.gdin.gdin.controllers;

import com.gdin.gdin.dtos.ReviewDto;
import com.gdin.gdin.entities.Review;
import com.gdin.gdin.services.ReviewService;
import jakarta.transaction.Transactional;
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
    @Transactional
    public ResponseEntity<Review> saveReview(@Valid @RequestBody Review review, @PathVariable UUID spotId){
        return ResponseEntity.ok(reviewService.saveReview(review, spotId));
    }

    @GetMapping("/{spotId}")
    public ResponseEntity<List<ReviewDto>> getAllReviewsForSpot(@PathVariable UUID spotId, @RequestParam String sortCriteria){
        return ResponseEntity.ok(reviewService.getAllReviewsForSpot(spotId, sortCriteria));
    }

    @DeleteMapping("/{reviewId}")
    @Transactional
    public ResponseEntity<String> deleteReview(@PathVariable UUID reviewId) {
        return reviewService.findReviewById(reviewId)
                .map(comment -> {
                    reviewService.deleteReviewById(reviewId);
                    return ResponseEntity.ok("Recenzija je uspešno obrisana.");
                })
                .orElseThrow(() -> new RuntimeException("Review not found." + reviewId));
    }

    @PutMapping("/{reviewId}/like")
    public ResponseEntity<Review> likeReview(@PathVariable UUID reviewId) {
        return ResponseEntity.ok(reviewService.likeReview(reviewId));
    }

    @PutMapping("/{reviewId}/dislike")
    public ResponseEntity<Review> dislikeReview(@PathVariable UUID reviewId) {
        return ResponseEntity.ok(reviewService.dislikeReview(reviewId));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable UUID reviewId, @Valid @RequestBody ReviewDto updatedReviewDto) {
        Review updatedReview = reviewService.updateReview(reviewId, updatedReviewDto);
        return ResponseEntity.ok(updatedReview);
    }

}