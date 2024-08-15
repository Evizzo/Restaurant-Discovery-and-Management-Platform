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

/**
 * Controller class for handling operations related to reviews.
 */
@AllArgsConstructor
@RestController
@RequestMapping("review")
public class ReviewController {
    private final ReviewService reviewService;

    /**
     * Saves a new review for a specified spot.
     *
     * This endpoint allows a user to submit a review for a spot. The review must be valid.
     *
     * @param review The Review object containing review details.
     * @param spotId The UUID of the spot the review is associated with.
     * @return ResponseEntity containing the saved Review object.
     */
    @PostMapping("/{spotId}")
    @Transactional
    public ResponseEntity<Review> saveReview(@Valid @RequestBody Review review, @PathVariable UUID spotId){
        return ResponseEntity.ok(reviewService.saveReview(review, spotId));
    }

    /**
     * Retrieves all reviews for a specified spot.
     *
     * This endpoint returns a list of reviews for a given spot, sorted according to the specified criteria.
     *
     * @param spotId The UUID of the spot whose reviews are to be retrieved.
     * @param sortCriteria The criteria for sorting the reviews (e.g., date, rating).
     * @return ResponseEntity containing a list of ReviewDto objects for the specified spot.
     */
    @GetMapping("/{spotId}")
    public ResponseEntity<List<ReviewDto>> getAllReviewsForSpot(@PathVariable UUID spotId, @RequestParam String sortCriteria){
        return ResponseEntity.ok(reviewService.getAllReviewsForSpot(spotId, sortCriteria));
    }

    /**
     * Deletes a review by its ID.
     *
     * This endpoint allows a user to delete a review by its ID. If the review is found and deleted,
     * a success message is returned.
     *
     * @param reviewId The UUID of the review to be deleted.
     * @return ResponseEntity with a success message if the review is successfully deleted,
     *         or a RuntimeException if the review is not found.
     */
    @DeleteMapping("/{reviewId}")
    @Transactional
    public ResponseEntity<String> deleteReview(@PathVariable UUID reviewId) {
        return reviewService.findReviewById(reviewId)
                .map(comment -> {
                    reviewService.deleteReviewById(reviewId);
                    return ResponseEntity.ok("Review is deleted.");
                })
                .orElseThrow(() -> new RuntimeException("Review not found." + reviewId));
    }

    /**
     * Likes a review by its ID.
     *
     * This endpoint increments the like count for a review.
     *
     * @param reviewId The UUID of the review to be liked.
     * @return ResponseEntity containing the updated Review object with the incremented like count.
     */
    @PutMapping("/{reviewId}/like")
    public ResponseEntity<Review> likeReview(@PathVariable UUID reviewId) {
        return ResponseEntity.ok(reviewService.likeReview(reviewId));
    }

    /**
     * Dislikes a review by its ID.
     *
     * This endpoint increments the dislike count for a review.
     *
     * @param reviewId The UUID of the review to be disliked.
     * @return ResponseEntity containing the updated Review object with the incremented dislike count.
     */
    @PutMapping("/{reviewId}/dislike")
    public ResponseEntity<Review> dislikeReview(@PathVariable UUID reviewId) {
        return ResponseEntity.ok(reviewService.dislikeReview(reviewId));
    }

    /**
     * Updates an existing review by its ID.
     *
     * This endpoint allows a user to update the details of a review. The updated review must be valid.
     *
     * @param reviewId The UUID of the review to be updated.
     * @param updatedReviewDto The ReviewDto object containing updated review details.
     * @return ResponseEntity containing the updated Review object.
     */
    @PutMapping("/{reviewId}")
    @Transactional
    public ResponseEntity<Review> updateReview(@PathVariable UUID reviewId, @Valid @RequestBody ReviewDto updatedReviewDto) {
        Review updatedReview = reviewService.updateReview(reviewId, updatedReviewDto);
        return ResponseEntity.ok(updatedReview);
    }

}