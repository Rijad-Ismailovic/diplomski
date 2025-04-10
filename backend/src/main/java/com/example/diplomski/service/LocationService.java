package com.example.diplomski.service;

import com.example.diplomski.dto.LocationDto;

import java.util.List;

public interface LocationService {
    LocationDto getLocationById(Long id);

    List<LocationDto> getAllLocations();

    LocationDto createLocation(LocationDto LocationDto);

    LocationDto updateLocation(Long id, LocationDto LocationDto);

    void deleteLocation(Long id);
}
