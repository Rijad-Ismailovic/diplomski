package com.example.diplomski.service.impl;

import com.example.diplomski.dto.ReviewDto;
import com.example.diplomski.entity.Review;
import com.example.diplomski.mapper.ReviewMapper;
import com.example.diplomski.repository.ReviewRepository;
import com.example.diplomski.service.ReviewService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final EmailService emailService;

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = ReviewMapper.mapToEntity(reviewDto);
        Review saved = reviewRepository.save(review);

        // Send email notification to admin
        try {
            emailService.sendReviewNotificationEmail(
                    review.getUsername(),
                    review.getTicketId(),
                    review.getRating(),
                    review.getComment()
            );
        } catch (MessagingException e) {
            System.out.println("error ovdje");
        }

        return ReviewMapper.mapToDto(saved);
    }


    @Override
    public List<ReviewDto> getReviewsByTicketId(Long ticketId) {
        return reviewRepository.findByTicketId(ticketId)
                .stream()
                .map(ReviewMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewDto> getReviewsByUsername(String username) {
        return reviewRepository.findByUsername(username)
                .stream()
                .map(ReviewMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
