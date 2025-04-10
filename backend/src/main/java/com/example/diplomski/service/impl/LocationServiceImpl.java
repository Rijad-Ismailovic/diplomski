package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.ResourceNotFoundException;
import com.example.diplomski.dto.LocationDto;
import com.example.diplomski.dto.LocationDto;
import com.example.diplomski.entity.Location;
import com.example.diplomski.mapper.LocationMapper;
import com.example.diplomski.repository.LocationRepository;
import com.example.diplomski.service.LocationService;
import com.example.diplomski.service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class LocationServiceImpl implements LocationService {
    private LocationRepository LocationRepository;
    @Override
    public LocationDto getLocationById(Long id) {
        Location location = LocationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location with given ID doesnt exist: " + id));
        return LocationMapper.mapToLocationDto(location);
    }

    @Override
    public List<LocationDto> getAllLocations() {
        List<Location> locations = LocationRepository.findAll();
        return locations.stream().map((location) -> LocationMapper.mapToLocationDto(location)).collect(Collectors.toList());
    }

    @Override
    public LocationDto createLocation(LocationDto locationDto) {
        Location location = LocationMapper.mapToLocation(locationDto);
        Location savedLocation = LocationRepository.save(location);
        return LocationMapper.mapToLocationDto(savedLocation);
    }

    @Override
    public LocationDto updateLocation(Long id, LocationDto locationDto) {
        Location existingLocation = LocationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location with given ID doesnt exist: " + id));

        BeanUtils.copyProperties(locationDto, existingLocation, "id");

        Location updatedLocation = LocationRepository.save(existingLocation);
        return LocationMapper.mapToLocationDto(updatedLocation);
    }

    @Override
    public void deleteLocation(Long id) {
        LocationRepository.deleteById(id);
    }
}
