package com.example.diplomski.repository;

import com.example.diplomski.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTicketId(Long ticketId);
    List<Review> findByUsername(String username);
}
