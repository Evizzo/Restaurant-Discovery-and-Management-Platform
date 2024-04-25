package com.gdin.gdin.services;

import com.gdin.gdin.dtos.ReviewDto;
import com.gdin.gdin.dtos.UserDto;
import com.gdin.gdin.entities.Review;
import com.gdin.gdin.entities.Spot;
import com.gdin.gdin.entities.User;
import com.gdin.gdin.repositories.ReviewRepository;
import com.gdin.gdin.repositories.SpotRepository;
import com.gdin.gdin.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final SpotRepository spotRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    public ReviewDto convertReviewToDto(Review review) {
        UserDto reviewerDto = userService.convertToDto(review.getReviewer());

        return ReviewDto.builder()
                .id(review.getId())
                .totalRating(review.getTotalRating())
                .comment(review.getComment())
                .isEdited(review.isEdited())
                .date(review.getDate())
                .reviewer(reviewerDto)
                .likes(review.getLikes())
                .dislikes(review.getDislikes())
                .likedByUsers(review.getLikedByUsers())
                .dislikedByUsers(review.getDislikedByUsers())
//                .reviewerEmail(review.getReviewer().getEmail())
                .build();
    }

    public Review saveReview(Review review, UUID spotId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        Optional<Spot> optionalSpot = spotRepository.findById(spotId);

        if (optionalUser.isPresent() && optionalSpot.isPresent()) {
            User reviewer = optionalUser.get();
            Spot spot = optionalSpot.get();

            boolean hasReviewed = spot.getReviews().stream()
                    .anyMatch(existingReview -> existingReview.getReviewer().equals(reviewer));

            if (hasReviewed) {
                throw new RuntimeException("Već ste postavili jednu recenziju !");
            }

            review.setReviewer(reviewer);
            review.setSpot(spot);
            review.setDate(LocalDateTime.now());
            review.setEdited(false);
            review.setLikes(0);
            review.setDislikes(0);

            spotRepository.incrementReviewCount(spotId);

            return reviewRepository.save(review);
        } else {
            throw new RuntimeException("User or review not found");
        }
    }

    public Optional<Review> findReviewById(UUID id){
        return reviewRepository.findById(id);
    }

    public List<ReviewDto> getAllReviewsForSpot(UUID spotId, String sortCriteria) {
        Optional<Spot> optionalSpot = spotRepository.findById(spotId);

        if (optionalSpot.isPresent()) {
            List<Review> reviews = new ArrayList<>(optionalSpot.get().getReviews());
//            Spot spot = optionalEvent.get();

//            switch (sortCriteria) {
//                case "likes" -> comments.sort(Comparator.comparing(Comment::getLikes).reversed());
//                case "dislikes" -> comments.sort(Comparator.comparing(Comment::getDislikes).reversed());
//                default -> comments.sort(Comparator.comparing(Comment::getDate).reversed());
//            }

            return reviews.stream()
                    .map(this::convertReviewToDto)
                    .collect(Collectors.toList());
        } else {
            throw new RuntimeException("Spot not found with ID: " + spotId);
        }
    }

    public void deleteReviewById(UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        Optional<Review> optionalReview = reviewRepository.findById(id);

        optionalUser.ifPresent(user -> optionalReview.ifPresent(review -> {
            UUID reviewerId = review.getReviewer().getId();
            UUID userId = user.getId();
            if (reviewerId.equals(userId)) {
                Spot spot = review.getSpot();

                spotRepository.decrementReviewCount(spot.getSpotId());

                reviewRepository.deleteById(id);
            } else {
                throw new RuntimeException("You are not authorized to delete this comment.");
            }
        }));
    }

    public Review likeReview(UUID reviewId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        String userId = userRepository.findByEmail(userEmail).get().getEmail();

        return reviewRepository.findById(reviewId)
                .map(review -> {
                    Set<String> likedByUsers = review.getLikedByUsers();
                    Set<String> dislikedByUsers = review.getDislikedByUsers();

                    if (likedByUsers.contains(userId)) {
                        review.setLikes(review.getLikes() - 1);
                        likedByUsers.remove(userId);
                    } else {
                        review.setLikes(review.getLikes() + 1);
                        likedByUsers.add(userId);

                        if (dislikedByUsers.contains(userId)) {
                            review.setDislikes(review.getDislikes() - 1);
                            dislikedByUsers.remove(userId);
                        }
                    }
                    return reviewRepository.save(review);
                })
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + reviewId));
    }

    public Review dislikeReview(UUID reviewId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = null;
        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            userEmail = oauth2User.getAttribute("email");
        }

        String userId = userRepository.findByEmail(userEmail).get().getEmail();

        return reviewRepository.findById(reviewId)
                .map(review -> {
                    Set<String> likedByUsers = review.getLikedByUsers();
                    Set<String> dislikedByUsers = review.getDislikedByUsers();

                    if (dislikedByUsers.contains(userId)) {
                        review.setDislikes(review.getDislikes() - 1);
                        dislikedByUsers.remove(userId);
                    } else {
                        review.setDislikes(review.getDislikes() + 1);
                        dislikedByUsers.add(userId);

                        if (likedByUsers.contains(userId)) {
                            review.setLikes(review.getLikes() - 1);
                            likedByUsers.remove(userId);
                        }
                    }

                    return reviewRepository.save(review);
                })
                .orElseThrow(() -> new RuntimeException("Review not found with ID: " + reviewId));
    }
}
