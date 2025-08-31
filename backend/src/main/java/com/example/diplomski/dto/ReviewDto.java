package com.example.diplomski.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private Long ticketId;
    private String username;
    private int rating;
    private String comment;
}
