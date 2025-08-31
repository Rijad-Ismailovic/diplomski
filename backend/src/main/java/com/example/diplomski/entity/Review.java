package com.example.diplomski.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long ticketId;   // FK to Ticket
    private String username; // who left review

    private int rating;      // 1-5 stars
    private String comment;  // free text
}
