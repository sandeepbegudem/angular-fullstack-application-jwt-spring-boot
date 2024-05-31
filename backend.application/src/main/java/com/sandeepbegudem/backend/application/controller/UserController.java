package com.sandeepbegudem.backend.application.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sandeepbegudem.backend.application.entity.Role;
import com.sandeepbegudem.backend.application.entity.User;
import com.sandeepbegudem.backend.application.helper.JWTHelper;
import com.sandeepbegudem.backend.application.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.stream.Collectors;

import static com.sandeepbegudem.backend.application.constants.JWTUtil.AUTH_HEADER;
import static com.sandeepbegudem.backend.application.constants.JWTUtil.SECRET;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTHelper jwtHelper;

    @GetMapping
    @PreAuthorize("hasAuthority('Admin')")
    public boolean checkIfEmailExists(@RequestParam(name = "email", defaultValue = "") String email)  {
        return userRepository.findByEmail(email) != null;
    }

    @GetMapping("/refresh-token")
    public void generateNewAccessToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String jwtRefreshToken = jwtHelper.extractTokenFromHeaderIfExists(request.getHeader(AUTH_HEADER));
        if (jwtRefreshToken != null) {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = jwtVerifier.verify(jwtRefreshToken);
            String email = decodedJWT.getSubject();
            User user = userRepository.findByEmail(email);
            String jwtAccessToken = jwtHelper.generateAccessToken(user.getEmail(), user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
            response.setContentType("application/json");
            new ObjectMapper().writeValue(response.getOutputStream(), jwtHelper.getTokensMap(jwtAccessToken, jwtRefreshToken));

        } else throw new RuntimeException("Refresh Token Required");
    }
}
