package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.BreachedPasswordException;
import com.example.diplomski.common.exceptions.UserAlreadyExistsException;
import com.example.diplomski.dto.LoginRequestDto;
import com.example.diplomski.dto.UserDto;
import com.example.diplomski.entity.User;
import com.example.diplomski.mapper.UserMapper;
import com.example.diplomski.repository.UserRepository;
import com.example.diplomski.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private SecurityUtil securityUtil;

    public UserDto register(UserDto userDto) throws Exception {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByEmail(userDto.getEmail()));
        if (optionalUser.isPresent()){
            throw new UserAlreadyExistsException("Email is taken");
        }

        optionalUser = Optional.ofNullable(userRepository.findByUsername(userDto.getUsername()));
        if (optionalUser.isPresent()){
            throw new UserAlreadyExistsException("Username is taken");
        }

        if(securityUtil.isPwned(userDto.getPassword())){
            throw new BreachedPasswordException("Password is breached");
        }

        userDto.setPassword(encoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(UserMapper.mapToUser(userDto));
        return UserMapper.mapToUserDto(savedUser);
    }

    public String verify(LoginRequestDto loginRequestDto){
        Authentication authenticationToken = authManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getUsernameOrEmail(), loginRequestDto.getPassword()));

        if(authenticationToken.isAuthenticated()){
            return jwtService.generateToken(loginRequestDto.getUsernameOrEmail());
        }
        return "fail";
    }
}
