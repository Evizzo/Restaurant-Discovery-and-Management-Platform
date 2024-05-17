package com.gdin.gdin.repositories;

import com.gdin.gdin.entities.Review;
import com.gdin.gdin.entities.Spot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface SpotRepository extends JpaRepository<Spot, UUID>, JpaSpecificationExecutor<Spot> {
    @Modifying
    @Transactional
    @Query("UPDATE Spot s SET s.reviewsCount = s.reviewsCount + 1 WHERE s.spotId = :spotIdP")
    void incrementReviewCount(UUID spotIdP);

    @Modifying
    @Transactional
    @Query("UPDATE Spot s SET s.reviewsCount = s.reviewsCount - 1 WHERE s.spotId = :spotIdP")
    void decrementReviewCount(UUID spotIdP);

    @Modifying
    @Query("UPDATE Spot s SET s.totalReview = :totalReview WHERE s.id = :spotId")
    void updateTotalReview(@Param("spotId") UUID spotId, @Param("totalReview") int totalReview);

    @Query("SELECT s.reviews FROM Spot s WHERE s.spotId = :spotId")
    List<Review> findReviewsBySpotId(@Param("spotId") UUID spotId);

    List<Spot> findByOwnerIdOrderByNameAsc(UUID ownerId);

}