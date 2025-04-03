package com.example.diplomski.controller;

import com.example.diplomski.dto.VehicleDto;
import com.example.diplomski.service.VehicleService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private VehicleService vehicleService;


    @GetMapping("/{id}")
    public ResponseEntity<VehicleDto> getVehicleById(@PathVariable("id") Long id){
        VehicleDto vehicleDto = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(vehicleDto);
    }

    @GetMapping
    public ResponseEntity<List<VehicleDto>> getAllVehicles(){
        List<VehicleDto> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping
    public ResponseEntity<VehicleDto> createVehicle(@RequestBody VehicleDto vehicleDto){
        VehicleDto savedVehicleDto = vehicleService.createVehicle(vehicleDto);
        return new ResponseEntity<>(savedVehicleDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleDto> updateVehicle(@PathVariable("id") Long id, @RequestBody VehicleDto vehicleDto){
        VehicleDto updatedVehicleDto = vehicleService.updateVehicle(id, vehicleDto);
        return ResponseEntity.ok(updatedVehicleDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("id") Long id){
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle with given ID deleted succesfully: " + id);
    }

}
