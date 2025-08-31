package com.example.diplomski.service;

import com.example.diplomski.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto);
    List<ReviewDto> getReviewsByTicketId(Long ticketId);
    List<ReviewDto> getReviewsByUsername(String username);
}
