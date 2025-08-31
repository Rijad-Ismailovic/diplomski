package com.example.diplomski.controller;

import com.example.diplomski.dto.LoginRequestDto;
import com.example.diplomski.dto.UpdateProfileRequestDto;
import com.example.diplomski.dto.UserDto;
import com.example.diplomski.service.UserService;
import com.example.diplomski.service.impl.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JWTService jwtService;


    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto) throws Exception {
        return userService.register(userDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDto loginRequestDto){
        return userService.verify(loginRequestDto);
    }

    @PostMapping("/user")
    public UserDto getUser(@RequestHeader("Authorization") String authHeader) throws Exception {
        String token = authHeader.substring(7);
        String userId = jwtService.extractSub(token);
        return this.userService.getUserByUsername(userId);
    }

    @PostMapping("/user/update")
    public UserDto updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateProfileRequestDto updateRequest) {

        String token = authHeader.substring(7); // remove "Bearer "
        String username = jwtService.extractSub(token); // subject = username
        return userService.updateProfile(username, updateRequest);
    }


}
