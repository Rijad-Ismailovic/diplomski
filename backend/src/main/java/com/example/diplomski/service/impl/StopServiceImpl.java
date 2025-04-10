package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.ResourceNotFoundException;
import com.example.diplomski.dto.StopDto;
import com.example.diplomski.entity.Location;
import com.example.diplomski.entity.Stop;
import com.example.diplomski.entity.Trip;
import com.example.diplomski.mapper.StopMapper;
import com.example.diplomski.repository.LocationRepository;
import com.example.diplomski.repository.StopRepository;
import com.example.diplomski.repository.TripRepository;
import com.example.diplomski.service.StopService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class StopServiceImpl implements StopService {
    private StopRepository stopRepository;
    private TripRepository tripRepository;
    private LocationRepository locationRepository;
    @Override
    public StopDto getStopById(Long id) {
        Stop stop = stopRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Stop with given ID doesnt exist: " + id));
        return StopMapper.mapToStopDto(stop);
    }

    @Override
    public List<StopDto> getAllStops() {
        List<Stop> stops = stopRepository.findAll();
        return stops.stream().map((stop) -> StopMapper.mapToStopDto(stop)).collect(Collectors.toList());
    }

    @Override
    public StopDto createStop(StopDto stopDto) {
        Trip trip = tripRepository.findById(stopDto.getTripId()).orElseThrow(() -> new ResourceNotFoundException("Trip with given ID doesnt exist: " + stopDto.getTripId()));
        Location location = locationRepository.findById(stopDto.getLocationId().getId()).orElseThrow(() -> new ResourceNotFoundException("Location with given ID doesnt exist: " + stopDto.getLocationId()));

        Stop stop = StopMapper.mapToStop(stopDto, trip, location);
        Stop savedStop = stopRepository.save(stop);

        return StopMapper.mapToStopDto(savedStop);
    }

    @Override
    public StopDto updateStop(Long id, StopDto StopDto) {
        Stop existingStop = stopRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Stop with given ID doesnt exist: " + id));

        BeanUtils.copyProperties(StopDto, existingStop, "id");

        Stop updatedStop = stopRepository.save(existingStop);
        return StopMapper.mapToStopDto(updatedStop);
    }

    @Override
    public void deleteStop(Long id) {
        stopRepository.deleteById(id);
    }

    @Override
    public List<StopDto> getStopsByTripId(Long tripId) {
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new ResourceNotFoundException("Trip with given ID doesnt exist: " + tripId));
        List<Stop> stops = stopRepository.findAllByTrip(trip);

        return stops.stream().map((stop) -> StopMapper.mapToStopDto(stop)).collect(Collectors.toList());
    }
}
