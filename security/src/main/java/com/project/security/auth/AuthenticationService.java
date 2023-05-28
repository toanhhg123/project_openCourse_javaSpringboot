package com.project.security.auth;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.security.config.JwtService;
import com.project.security.models.Account;
import com.project.security.models.Role;
import com.project.security.repositories.RoleRepository;
import com.project.security.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final RoleRepository roleRepository;
        private static final Logger logger = LogManager.getLogger(AuthenticationController.class);

        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
                Optional<Role> role = roleRepository.findById(request.roleId);

                var user = Account.builder()
                                .address(request.getAddress())
                                .phoneNumber(request.getPhoneNumber())
                                .userName(request.getUserName())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(role.get())
                                .build();
                var savedUser = repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                logger.info(request.getPhoneNumber());
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getPhoneNumber(),
                                                request.getPassword()));
                var user = repository.findByPhoneNumber(request.getPhoneNumber())
                                .orElseThrow();
                var role = user.getRole();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .userName(user.getUsername())
                                .role(Role.builder().roleName(role.getRoleName()).build())
                                .build();
        }
}