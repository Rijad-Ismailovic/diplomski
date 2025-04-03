package com.example.diplomski.service;

import com.example.diplomski.dto.DriverDto;

import java.util.List;

public interface DriverService {
    DriverDto getDriverById(Long id);

    List<DriverDto> getAllDrivers();

    DriverDto createDriver(DriverDto driverDto);

    DriverDto updateDriver(Long id, DriverDto driverDto);

    void deleteDriver(Long id);
}
