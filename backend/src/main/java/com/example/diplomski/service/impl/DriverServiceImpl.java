package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.ResourceNotFoundException;
import com.example.diplomski.dto.DriverDto;
import com.example.diplomski.entity.Driver;
import com.example.diplomski.entity.Vehicle;
import com.example.diplomski.mapper.DriverMapper;
import com.example.diplomski.mapper.VehicleMapper;
import com.example.diplomski.repository.DriverRepository;
import com.example.diplomski.service.DriverService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DriverServiceImpl implements DriverService {
    private DriverRepository driverRepository;
    @Override
    public DriverDto getDriverById(Long id) {
        Driver driver = driverRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Driver with given ID doesnt exist: " + id));
        return DriverMapper.mapToDriverDto(driver);
    }

    @Override
    public List<DriverDto> getAllDrivers() {
        List<Driver> drivers = driverRepository.findAll();
        return drivers.stream().map((driver) -> DriverMapper.mapToDriverDto(driver)).collect(Collectors.toList());
    }

    @Override
    public DriverDto createDriver(DriverDto driverDto) {
        Driver driver = DriverMapper.mapToDriver(driverDto);
        Driver savedDriver = driverRepository.save(driver);
        return DriverMapper.mapToDriverDto(savedDriver);
    }

    @Override
    public DriverDto updateDriver(Long id, DriverDto driverDto) {
        Driver existingDriver = driverRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Driver with given ID doesnt exist: " + id));

        BeanUtils.copyProperties(driverDto, existingDriver, "id");

        Driver updatedDriver = driverRepository.save(existingDriver);
        return DriverMapper.mapToDriverDto(updatedDriver);
    }

    @Override
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}
