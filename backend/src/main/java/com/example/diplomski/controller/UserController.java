package com.example.diplomski.controller;

import com.example.diplomski.dto.LoginRequestDto;
import com.example.diplomski.dto.UserDto;
import com.example.diplomski.service.UserService;
import com.example.diplomski.service.impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api")

public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto) throws Exception {
        return userService.register(userDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDto loginRequestDto){
        return userService.verify(loginRequestDto);
    }


}
