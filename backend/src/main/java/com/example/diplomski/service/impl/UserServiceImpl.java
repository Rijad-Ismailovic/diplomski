package com.example.diplomski.service.impl;

import com.example.diplomski.dto.UserDto;
import com.example.diplomski.entity.User;
import com.example.diplomski.mapper.UserMapper;
import com.example.diplomski.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    public UserDto register(UserDto userDto){
        userDto.setPassword(encoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(UserMapper.mapToUser(userDto));
        return UserMapper.mapToUserDto(savedUser);
    }

    public String verify(UserDto userDto){
        Authentication authenticationToken = authManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));

        if(authenticationToken.isAuthenticated()){
            return jwtService.generateToken(userDto.getUsername());
        }
        return "fail";
    }
}
