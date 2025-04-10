package com.example.diplomski.mapper;

import com.example.diplomski.dto.StopDto;
import com.example.diplomski.entity.Location;
import com.example.diplomski.entity.Stop;
import com.example.diplomski.entity.Trip;

public class StopMapper {

    public static StopDto mapToStopDto(Stop stop){
        return new StopDto(
                stop.getId(),
                stop.getTrip().getId(),
                stop.getLocation(),
                stop.getType(),
                stop.getDate(),
                stop.getTime(),
                stop.getSequence()
        );
    }

    public static Stop mapToStop(StopDto stopDto, Trip trip, Location location){
        return new Stop(
                stopDto.getId(),
                trip,
                location,
                stopDto.getType(),
                stopDto.getDate(),
                stopDto.getTime(),
                stopDto.getSequence()
        );
    }
}
