package com.example.diplomski.service;

import com.example.diplomski.dto.LoginRequestDto;
import com.example.diplomski.dto.UpdateProfileRequestDto;
import com.example.diplomski.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto register(UserDto userDto) throws Exception;
    String verify(LoginRequestDto loginRequestDto);

    // CRUD with Long IDs
    UserDto createUser(UserDto userDto);
    UserDto getUserByUsername(String username);
    List<UserDto> getAllUsers();
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);

    String getFullNameById(Long id);

    UserDto updateProfile(String username, UpdateProfileRequestDto updateRequest);

}
