package com.example.diplomski.mapper;

import com.example.diplomski.dto.UserDto;
import com.example.diplomski.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getPassword()
        );
    }

    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getId(),
                userDto.getFullName(),
                userDto.getUsername(),
                userDto.getPassword()
        );
    }
}
