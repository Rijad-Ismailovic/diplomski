package com.example.diplomski.dto;

import com.example.diplomski.common.enums.DriverStatus;
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
public class DriverDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String licenseNumber;
    private String phoneNumber;
    private String email;
    private String username;
    private String password;
    private LocalDate hireDate;
    private DriverStatus status;
    private int years_of_experience;
    private double monthlySalary;
    private int numOfCompletedTrips;
    private double averageRating;
}
