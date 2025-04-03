package com.example.diplomski.dto;

import com.example.diplomski.common.enums.TripStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TripDto {
    private Long id;
    private Long vehicleId;
    private Long driverId;
    private String departureLocation;
    private LocalTime departureTime;
    private LocalDate departureDate;
    private String arrivalLocation;
    private LocalTime arrivalTime;
    private LocalDate arrivalDate;
    private int distanceKm;
    private int durationMinutes;
    private TripStatus tripStatus;
    private int numOfSeats;
    private int numOfAvailableSeats;
    private double price;
    private String notes;
}
