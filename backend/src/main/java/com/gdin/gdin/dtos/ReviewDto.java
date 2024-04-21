package com.gdin.gdin.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import com.gdin.gdin.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private UUID id;

    private int totalRating;
    private int hygieneRating;
    private String comment;
    private LocalDateTime date;
    private boolean isEdited;
    private String reviewerEmail;

//    private User reviewer;
    private SpotDto spot;
}
