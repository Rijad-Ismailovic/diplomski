package com.example.diplomski.dto;

import lombok.Data;

@Data
public class ContactMessageDto {
    private String fullName;
    private String fromEmail;
    private String body;
}
