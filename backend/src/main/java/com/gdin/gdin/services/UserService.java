package com.gdin.gdin.services;

import com.gdin.gdin.dtos.UserDto;
import com.gdin.gdin.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {
    public UserDto convertToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .provider(user.getProvider())
                .pictureUrl(user.getPictureUrl())
                .build();
    }
}
