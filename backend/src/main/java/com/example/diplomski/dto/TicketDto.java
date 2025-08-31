package com.example.diplomski.dto;

import com.example.diplomski.entity.Location;
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
public class TicketDto {
    private Long id;
    private Long driverId;
    private Location departureLocation;
    private LocalTime departureTime;
    private LocalDate departureDate;
    private Location arrivalLocation;
    private LocalTime arrivalTime;
    private LocalDate arrivalDate;
    private int distanceKm;
    private int durationMinutes;
    private double price;
    private boolean hasWifi;
    private boolean hasRestroom;
    private boolean hasAc;
    private boolean hasOutlet;
    private boolean hasReclining;
    private String fullName;
    private String username;
    private LocalDate dateOfCreation;
    private String status;
}
