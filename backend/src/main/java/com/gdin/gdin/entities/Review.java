package com.gdin.gdin.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private int totalRating;
    private int hygieneRating;
    private String comment;
    private LocalDateTime date;
    private boolean isEdited;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spot_id")
    private Spot spot;
    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User reviewer;
}
