package com.gdin.gdin.dtos;

import java.time.LocalDateTime;
import java.util.Set;
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
    private String comment;
    private LocalDateTime date;
    private boolean isEdited;
//    private String reviewerEmail;

    private UserDto reviewer;
    private SpotDto spot;

    private Integer likes;
    private Integer dislikes;
    private Set<String> likedByUsers;
    private Set<String> dislikedByUsers;
}
