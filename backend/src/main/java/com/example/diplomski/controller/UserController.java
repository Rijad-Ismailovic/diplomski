package com.example.diplomski.controller;

import com.example.diplomski.dto.UserDto;
import com.example.diplomski.service.UserService;
import com.example.diplomski.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register")
    public UserDto register(@RequestBody UserDto userDto){
        return userService.register(userDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDto userDto){
        return userService.verify(userDto);
    }


}
