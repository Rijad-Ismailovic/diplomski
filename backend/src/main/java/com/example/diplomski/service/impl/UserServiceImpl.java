package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.BreachedPasswordException;
import com.example.diplomski.common.exceptions.UserAlreadyExistsException;
import com.example.diplomski.dto.LoginRequestDto;
import com.example.diplomski.dto.UpdateProfileRequestDto;
import com.example.diplomski.dto.UserDto;
import com.example.diplomski.entity.User;
import com.example.diplomski.mapper.UserMapper;
import com.example.diplomski.repository.UserRepository;
import com.example.diplomski.service.UserService;
import com.example.diplomski.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private SecurityUtil securityUtil;

    // ---------------- Register & Verify ----------------
    @Override
    public UserDto register(UserDto userDto) throws Exception {
        Optional<User> byEmail = Optional.ofNullable(userRepository.findByEmail(userDto.getEmail()));
        if (byEmail.isPresent()) {
            throw new UserAlreadyExistsException("Email is taken");
        }

        Optional<User> byUsername = Optional.ofNullable(userRepository.findByUsername(userDto.getUsername()));
        if (byUsername.isPresent()) {
            throw new UserAlreadyExistsException("Username is taken");
        }

        if (securityUtil.isPwned(userDto.getPassword())) {
            throw new BreachedPasswordException("Password is breached");
        }

        userDto.setPassword(encoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(UserMapper.mapToUser(userDto));
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public String verify(LoginRequestDto loginRequestDto) {
        Authentication authenticationToken = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getUsernameOrEmail(),
                        loginRequestDto.getPassword()
                )
        );

        if (!authenticationToken.isAuthenticated()) {
            return "fail";
        }

        // Ensure JWT subject is the numeric User ID (as String)
        String uoe = loginRequestDto.getUsernameOrEmail();
        User user = uoe.contains("@")
                ? Optional.ofNullable(userRepository.findByEmail(uoe))
                .orElseThrow(() -> new RuntimeException("User not found by email: " + uoe))
                : Optional.ofNullable(userRepository.findByUsername(uoe))
                .orElseThrow(() -> new RuntimeException("User not found by username: " + uoe));

        return jwtService.generateToken(String.valueOf(user.getUsername()));
    }

    // ---------------- CRUD ----------------
    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setPassword(encoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(UserMapper.mapToUser(userDto));
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = Optional.ofNullable(userRepository.findByUsername(username))
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::mapToUserDto)
                .toList();
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());
        if (userDto.getPassword() != null && !userDto.getPassword().isBlank()) {
            existingUser.setPassword(encoder.encode(userDto.getPassword()));
        }
        existingUser.setFullName(userDto.getFullName());

        User updatedUser = userRepository.save(existingUser);
        return UserMapper.mapToUserDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public String getFullNameById(Long id) {
        return userRepository.findById(id)
                .map(User::getFullName)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public UserDto updateProfile(String username, UpdateProfileRequestDto updateRequest) {
        User user = Optional.ofNullable(userRepository.findByUsername(username))
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        // Verify current password always
        if (!encoder.matches(updateRequest.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Update full name
        if (updateRequest.getFullName() != null && !updateRequest.getFullName().isBlank()) {
            user.setFullName(updateRequest.getFullName());
        }

        // Handle password update
        boolean hasNew = updateRequest.getNewPassword() != null && !updateRequest.getNewPassword().isBlank();
        boolean hasRepeat = updateRequest.getRepeatPassword() != null && !updateRequest.getRepeatPassword().isBlank();

        if (hasNew || hasRepeat) {
            // Require both
            if (!(hasNew && hasRepeat)) {
                throw new RuntimeException("Both new password fields must be filled");
            }

            // Check match
            if (!updateRequest.getNewPassword().equals(updateRequest.getRepeatPassword())) {
                throw new RuntimeException("New password and repeated password do not match");
            }

            // Check breach
            if (securityUtil.isPwned(updateRequest.getNewPassword())) {
                throw new RuntimeException("New password is breached");
            }

            // Set password
            user.setPassword(encoder.encode(updateRequest.getNewPassword()));
        }

        User updated = userRepository.save(user);
        return UserMapper.mapToUserDto(updated);
    }


}
