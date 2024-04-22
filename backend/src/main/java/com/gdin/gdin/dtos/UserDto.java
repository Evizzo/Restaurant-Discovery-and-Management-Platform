package com.gdin.gdin.dtos;

import com.gdin.gdin.enums.Provider;
import com.gdin.gdin.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;

    private String firstname;

    private String lastname;

    private String email;

    private Role role;

    private Provider provider;

    private String pictureUrl;
}
