package com.example.diplomski.mapper;

import com.example.diplomski.dto.LocationDto;
import com.example.diplomski.entity.Location;

public class LocationMapper {
    public static LocationDto mapToLocationDto(Location location){
        return new LocationDto(
                location.getId(),
                location.getName(),
                location.getCountry(),
                location.getLatitude(),
                location.getLongitude(),
                location.getImagePath()
        );
    }

    public static Location mapToLocation(LocationDto locationDto){
        return new Location(
                locationDto.getId(),
                locationDto.getName(),
                locationDto.getCountry(),
                locationDto.getLatitude(),
                locationDto.getLongitude(),
                locationDto.getImagePath()
        );
    }
}
