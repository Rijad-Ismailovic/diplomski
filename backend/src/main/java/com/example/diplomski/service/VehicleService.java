package com.example.diplomski.service;

import com.example.diplomski.dto.VehicleDto;

import java.util.List;

public interface VehicleService {

    VehicleDto getVehicleById(Long id);

    List<VehicleDto> getAllVehicles();

    VehicleDto createVehicle(VehicleDto vehicleDto);

    VehicleDto updateVehicle(Long id, VehicleDto vehicleDto);

    void deleteVehicle(Long id);
}
