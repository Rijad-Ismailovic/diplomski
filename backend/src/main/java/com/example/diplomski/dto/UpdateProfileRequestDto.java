package com.example.diplomski.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequestDto {
    private String fullName;
    private String currentPassword;
    private String newPassword;
    private String repeatPassword;
}
