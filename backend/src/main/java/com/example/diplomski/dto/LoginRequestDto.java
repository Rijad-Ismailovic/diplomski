package com.example.diplomski.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginRequestDto {
    private String usernameOrEmail;
    private String password;
}
