package com.example.diplomski.controller;

import com.example.diplomski.dto.StopDto;
import com.example.diplomski.service.StopService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/stops")
public class StopController {
    private StopService stopService;
    @RequestMapping("/{id}")
    public ResponseEntity<StopDto> getStopById(@PathVariable("id") Long id){
        StopDto stopDto = stopService.getStopById(id);
        return ResponseEntity.ok(stopDto);
    }

    @RequestMapping
    public ResponseEntity<List<StopDto>> getAllStops(){
        List<StopDto> stops = stopService.getAllStops();
        return ResponseEntity.ok(stops);
    }

    @PostMapping
    public ResponseEntity<StopDto> createStop(@RequestBody StopDto stopDto){
        StopDto savedStopDto = stopService.createStop(stopDto);
        return new ResponseEntity<>(savedStopDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StopDto> updateStop(@PathVariable("id") Long id, @RequestBody StopDto stopDto){
        StopDto updatedStopDto = stopService.updateStop(id, stopDto);
        return ResponseEntity.ok(updatedStopDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStop(@PathVariable("id") Long id){
        stopService.deleteStop(id);
        return ResponseEntity.ok("Stop with given ID deleted succesfully: " + id);
    }

    @GetMapping("/trip/{id}")
    public ResponseEntity<List<StopDto>> getStopsByTripId(@PathVariable("id") Long tripId){
        List<StopDto> stops = stopService.getStopsByTripId(tripId);
        return ResponseEntity.ok(stops);
    }
}
