package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.ResourceNotFoundException;
import com.example.diplomski.dto.VehicleDto;
import com.example.diplomski.entity.Vehicle;
import com.example.diplomski.mapper.VehicleMapper;
import com.example.diplomski.repository.VehicleRepository;
import com.example.diplomski.service.VehicleService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class VehicleServiceImpl implements VehicleService {

    private VehicleRepository vehicleRepository;
    @Override
    public VehicleDto getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vehicle with given ID doesnt exist: " + id));
        return VehicleMapper.mapToVehicleDto(vehicle);
    }

    @Override
    public List<VehicleDto> getAllVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        return vehicles
                .stream()
                .map((vehicle) -> VehicleMapper.mapToVehicleDto(vehicle))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        Vehicle vehicle = VehicleMapper.mapToVehicle(vehicleDto);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return VehicleMapper.mapToVehicleDto(savedVehicle);
    }

    @Override
    public VehicleDto updateVehicle(Long id, VehicleDto vehicleDto) {
        Vehicle existingVehicle = vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vehicle with given ID doesnt exist: " + id));

        BeanUtils.copyProperties(vehicleDto, existingVehicle, "id");

        Vehicle updatedVehicle  = vehicleRepository.save(existingVehicle);
        return VehicleMapper.mapToVehicleDto(updatedVehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
