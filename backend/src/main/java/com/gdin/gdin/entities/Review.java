package com.gdin.gdin.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
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
    @Max(value = 5, message = "Ocena ne sme da prelazi 5 !")
    @Min(value = 1, message = "Ocena ne sme da bude manja od 1 !")
    private int totalRating;
//    @Max(value = 5, message = "Ocena ne sme da prelazi 5 !")
//    @Min(value = 1, message = "Ocena ne sme da bude manja od 1 !")
//    private int hygieneRating;
    @Size(max = 320, message = "Komentar ne sme da prelazi 320 karaktera !")
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
