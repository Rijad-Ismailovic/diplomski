package com.example.diplomski.mapper;

import com.example.diplomski.dto.ReviewDto;
import com.example.diplomski.entity.Review;

public class ReviewMapper {
    public static ReviewDto mapToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setTicketId(review.getTicketId());
        dto.setUsername(review.getUsername());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        return dto;
    }

    public static Review mapToEntity(ReviewDto dto) {
        return Review.builder()
                .id(dto.getId())
                .ticketId(dto.getTicketId())
                .username(dto.getUsername())
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();
    }
}
