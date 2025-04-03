package com.example.diplomski.mapper;

import com.example.diplomski.dto.DriverDto;
import com.example.diplomski.entity.Driver;

public class DriverMapper {
    public static DriverDto mapToDriverDto(Driver driver){
        return new DriverDto(
                driver.getId(),
                driver.getFirstName(),
                driver.getLastName(),
                driver.getLicenseNumber(),
                driver.getPhoneNumber(),
                driver.getEmail(),
                driver.getUsername(),
                driver.getPassword(),
                driver.getHireDate(),
                driver.getStatus(),
                driver.getYearsOfExperience(),
                driver.getMonthlySalary(),
                driver.getNumOfCompletedTrips(),
                driver.getAverageRating()
        );
    }

    public static Driver mapToDriver(DriverDto driverDto){
        return new Driver(
                driverDto.getId(),
                driverDto.getFirstName(),
                driverDto.getLastName(),
                driverDto.getLicenseNumber(),
                driverDto.getPhoneNumber(),
                driverDto.getEmail(),
                driverDto.getUsername(),
                driverDto.getPassword(),
                driverDto.getHireDate(),
                driverDto.getStatus(),
                driverDto.getYearsOfExperience(),
                driverDto.getMonthlySalary(),
                driverDto.getNumOfCompletedTrips(),
                driverDto.getAverageRating()
        );
    }
}
