package com.example.diplomski.controller;

import com.example.diplomski.dto.ReviewDto;
import com.example.diplomski.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // Create a new review for a ticket
    @PostMapping
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
        System.out.println("i am here");
        return ResponseEntity.ok(reviewService.createReview(reviewDto));
    }

    // Get reviews for a ticket
    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByTicketId(@PathVariable Long ticketId) {
        return ResponseEntity.ok(reviewService.getReviewsByTicketId(ticketId));
    }

    // Get reviews by username
    @GetMapping("/user/{username}")
    public ResponseEntity<List<ReviewDto>> getReviewsByUsername(@PathVariable String username) {
        return ResponseEntity.ok(reviewService.getReviewsByUsername(username));
    }
}
