package com.example.diplomski.controller;

import com.example.diplomski.dto.LocationDto;
import com.example.diplomski.service.LocationService;
import com.example.diplomski.service.impl.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/locations")
public class LocationController {
    private LocationService LocationService;
    private JWTService jwtService;

    @RequestMapping("/{id}")
    public ResponseEntity<LocationDto> getLocationById(@PathVariable("id") Long id){
        LocationDto locationDto = LocationService.getLocationById(id);
        return ResponseEntity.ok(locationDto);
    }

    @RequestMapping
    public ResponseEntity<List<LocationDto>> getAllLocations(){
        List<LocationDto> locations = LocationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @PostMapping
    public ResponseEntity<LocationDto> createLocation(@RequestBody LocationDto locationDto){
        LocationDto savedLocationDto = LocationService.createLocation(locationDto);
        return new ResponseEntity<>(savedLocationDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationDto> updateLocation(@PathVariable("id") Long id, @RequestBody LocationDto locationDto){
        LocationDto updatedLocationDto = LocationService.updateLocation(id, locationDto);
        return ResponseEntity.ok(updatedLocationDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable("id") Long id){
        LocationService.deleteLocation(id);
        return ResponseEntity.ok("Vehicle with given ID deleted succesfully: " + id);
    }
}
