package com.example.diplomski.entity;

import com.example.diplomski.common.enums.Fuel;
import com.example.diplomski.common.enums.VehicleStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "num_of_seats")
    private int numOfSeats;

    @Column(name = "fuel_capacity_liters")
    private double fuelCapacityLiters;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "year_of_manufacture")
    private int yearOfManufacture;

    @Column(name = "model")
    private String model;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "fuel_type")
    private Fuel fuelType;

    @Column(name = "status")
    private VehicleStatus status;

    @Column(name = "mileage_km")
    private int mileageKm;

    @Column(name = "last_service_date")
    private LocalDate lastServiceDate;

    @Column(name = "last_service_mileage")
    private int lastServiceMileage;

    @Column(name = "next_service_mileage")
    private int nextServiceMileage;

    @Column(name = "has_wifi")
    private boolean hasWifi;

    @Column(name = "has_ac")
    private boolean hasAC;

    @Column(name = "has_restroom")
    private boolean hasRestroom;
}
