package com.example.diplomski.controller;

import com.example.diplomski.dto.TripDto;
import com.example.diplomski.service.TripService;
import com.example.diplomski.service.impl.TripServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/trips")
public class TripController {
    private TripService tripService;

    @RequestMapping("/{id}")
    public ResponseEntity<TripDto> getTripById(@PathVariable Long id){
        TripDto tripDto = tripService.getTripById(id);
        return ResponseEntity.ok(tripDto);
    }

    @RequestMapping
    public ResponseEntity<List<TripDto>> getAllTrips(){
        List<TripDto> trips = tripService.getAllTrips();
        return ResponseEntity.ok(trips);
    }

    @PostMapping
    public ResponseEntity<TripDto> createTrip(@RequestBody TripDto tripDto){
        TripDto savedTripDto = tripService.createTrip(tripDto);
        return new ResponseEntity<>(savedTripDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TripDto> updateTrip(@PathVariable("id") Long id, @RequestBody TripDto tripDto){
        TripDto updatedTripDto = tripService.updateTrip(id, tripDto);
        return ResponseEntity.ok(updatedTripDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrip(@PathVariable("id") Long id){
        tripService.deleteTrip(id);
        return ResponseEntity.ok("Trip with given ID deleted successfully: " + id);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(name = "departure", required = false) String departureLocation,
                                    @RequestParam(name = "arrival", required = false) String arrivalLocation,
                                    @RequestParam(name = "departureDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
                                    @RequestParam(name = "returnDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate returnDate,
                                    @RequestParam(name = "wifi", required = false) boolean wifi,
                                    @RequestParam(name = "restroom", required = false) boolean restroom,
                                    @RequestParam(name = "ac", required = false) boolean ac,
                                    @RequestParam(name = "outlet", required = false) boolean outlet,
                                    @RequestParam(name = "reclining", required = false) boolean reclining,
                                    @RequestParam(name = "maxPrice", required = false) Integer maxPrice,
                                    @RequestParam(name = "maxDuration", required = false) Integer maxDuration){
        System.out.println(arrivalLocation);
        List<TripDto> trips = tripService.search(departureLocation, arrivalLocation, departureDate, returnDate, wifi, restroom, ac, outlet, reclining, maxPrice, maxDuration);
        return ResponseEntity.ok(trips);
    }
}
