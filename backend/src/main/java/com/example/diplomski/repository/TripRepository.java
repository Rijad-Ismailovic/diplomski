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
            "(:returnDate IS NULL OR t.returnDate = :returnDate) AND" +
            "(:wifi IS FALSE OR t.hasWifi = TRUE) AND" +
            "(:restroom IS FALSE OR t.hasRestroom = TRUE) AND" +
            "(:ac IS FALSE OR t.hasAc = TRUE) AND" +
            "(:outlet IS FALSE OR t.hasOutlet = TRUE) AND" +
            "(:reclining IS FALSE OR t.hasReclining = TRUE) AND " +
            "(:maxPrice IS NULL OR t.price <= :maxPrice) AND " +
            "(:maxDuration IS NULL OR t.durationMinutes <= :maxDuration)") 
    List<Trip> search(
            String departure,
            String arrival,
            LocalDate departureDate,
            LocalDate returnDate,
            boolean wifi,
            boolean restroom,
            boolean ac,
            boolean outlet,
            boolean reclining,
            Integer maxPrice,
            Integer maxDuration);
}
