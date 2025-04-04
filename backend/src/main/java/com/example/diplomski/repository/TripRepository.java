package com.example.diplomski.repository;

import com.example.diplomski.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    @Query("SELECT t FROM Trip t WHERE " +
            "(:departure IS NULL OR t.departureLocation = :departure) AND " +
            "(:arrival IS NULL OR t.arrivalLocation = :arrival) AND " +
            "(:departureDate IS NULL OR t.departureDate = :departureDate) AND " +
            "(:returnDate IS NULL OR t.returnDate = :returnDate)")
    List<Trip> search(String departure, String arrival, LocalDate departureDate, LocalDate returnDate);
}
