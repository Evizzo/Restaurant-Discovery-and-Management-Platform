package com.gdin.gdin.config;

import com.gdin.gdin.entities.User;
import com.gdin.gdin.enums.Provider;
import com.gdin.gdin.enums.Role;
import com.gdin.gdin.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@AllArgsConstructor
@Service
@RequestMapping()
public class AuthenticationService {
    private final UserRepository userRepository;

    public Optional<User> getUserDetailsGoogle() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof DefaultOAuth2User oauth2User) {
            String email = oauth2User.getAttribute("email");
            String firstName = oauth2User.getAttribute("given_name");
            String lastName = oauth2User.getAttribute("family_name");
            String pictureUrl = oauth2User.getAttribute("picture");

            User user = new User();
            user.setEmail(email);
            user.setFirstname(firstName);
            user.setLastname(lastName);
            user.setPictureUrl(pictureUrl);
            user.setRole(Role.USER);

            if(!userRepository.existsByEmail(user.getEmail())){
                user.setProvider(Provider.GOOGLE);
                userRepository.save(user);
            }

            return Optional.of(user);
        } else {
            throw new RuntimeException("User not found or none is logged in.");
        }
    }
}