package com.gdin.gdin.config;

import com.gdin.gdin.entities.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller class for handling authentication-related operations.
 */
@RestController
@RequestMapping("/authenticate")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final LogoutService logoutService;

    /**
     * Logs out the currently authenticated user.
     *
     * @param request  HttpServletRequest representing the current request.
     * @param response HttpServletResponse representing the current response.
     * @return ResponseEntity indicating the success of the logout operation.
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logoutService.logout(request, response, authentication);
        return ResponseEntity.ok().build();
    }

    /**
     * Retrieves user details from Google.
     *
     * This endpoint returns the user details retrieved from Google. It uses the
     * {@link AuthenticationService} to fetch the necessary information.
     *
     * @return ResponseEntity containing an Optional<User> with the Google user details.
     *         If no details are found, the Optional will be empty.
     */
    @GetMapping("/google/userdetails")
    public ResponseEntity<Optional<User>> getUserDetailsGoogle() {
        return ResponseEntity.ok(authenticationService.getUserDetailsGoogle());
    }
}