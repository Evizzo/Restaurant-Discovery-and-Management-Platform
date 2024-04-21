package com.gdin.gdin.repositories;

import com.gdin.gdin.entities.Spot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface SpotRepository extends JpaRepository<Spot, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Spot s SET s.reviewsCount = s.reviewsCount + 1 WHERE s.spotId = :spotIdP")
    void incrementReviewCount(UUID spotIdP);

    @Modifying
    @Transactional
    @Query("UPDATE Spot s SET s.reviewsCount = s.reviewsCount - 1 WHERE s.spotId = :spotIdP")
    void decrementReviewCount(UUID spotIdP);
}