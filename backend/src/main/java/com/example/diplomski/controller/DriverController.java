package com.example.diplomski.controller;

import com.example.diplomski.dto.DriverDto;
import com.example.diplomski.service.DriverService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/drivers")
public class DriverController {
    private DriverService driverService;
    @RequestMapping("/{id}")
    public ResponseEntity<DriverDto> getDriverById(@PathVariable("id") Long id){
        DriverDto driverDto = driverService.getDriverById(id);
        return ResponseEntity.ok(driverDto);
    }

    @RequestMapping
    public ResponseEntity<List<DriverDto>> getAllDrivers(){
        List<DriverDto> drivers = driverService.getAllDrivers();
        return ResponseEntity.ok(drivers);
    }

    @PostMapping
    public ResponseEntity<DriverDto> createDriver(@RequestBody DriverDto driverDto){
        DriverDto savedDriverDto = driverService.createDriver(driverDto);
        return new ResponseEntity<>(savedDriverDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DriverDto> updateDriver(@PathVariable("id") Long id, @RequestBody DriverDto driverDto){
        DriverDto updatedDriverDto = driverService.updateDriver(id, driverDto);
        return ResponseEntity.ok(updatedDriverDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDriver(@PathVariable("id") Long id){
        driverService.deleteDriver(id);
        return ResponseEntity.ok("Vehicle with given ID deleted succesfully: " + id);
    }
}
