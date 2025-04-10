package com.example.diplomski.service;

import com.example.diplomski.dto.StopDto;

import java.util.List;

public interface StopService {
    StopDto getStopById(Long id);

    List<StopDto> getAllStops();

    StopDto createStop(StopDto stopDto);

    StopDto updateStop(Long id, StopDto stopDto);

    void deleteStop(Long id);

    List<StopDto> getStopsByTripId(Long tripId);
}
