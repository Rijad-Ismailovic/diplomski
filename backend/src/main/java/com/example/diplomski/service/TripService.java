package com.example.diplomski.service;

import com.example.diplomski.dto.DriverDto;
import com.example.diplomski.dto.TripDto;

import java.time.LocalDate;
import java.util.List;

public interface TripService {
    TripDto getTripById(Long id);

    List<TripDto> getAllTrips();

    TripDto createTrip(TripDto tripDto);

    TripDto updateTrip(Long id, TripDto tripDto);

    void deleteTrip(Long id);

    List<TripDto> search(String departure, String arrival, LocalDate arrivalDate, LocalDate returnDate);
}
