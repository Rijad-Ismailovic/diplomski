package com.example.diplomski.dto;

import com.example.diplomski.common.enums.Fuel;
import com.example.diplomski.common.enums.VehicleStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VehicleDto {
    private Long id;
    private int numOfSeats;
    private double fuelCapacity;
    private String licensePlate;
    private int yearOfManufacture;
    private String model;
    private String manufacturer;
    private Fuel fuelType;
    private VehicleStatus status;
    private int mileageKm;
    private LocalDate lastServiceDate;
    private int lastServiceMileage;
    private int nextServiceMileage;
    private boolean hasWifi;
    private boolean hasAC;
    private boolean hasRestroom;
}
