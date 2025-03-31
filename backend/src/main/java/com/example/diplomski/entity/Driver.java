package com.example.diplomski.entity;

import com.example.diplomski.common.enums.DriverStatus;
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
@Table(name = "drivers")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "hire_date")
    private LocalDate hireDate;

    @Column(name = "status")
    private DriverStatus status;

    @Column(name = "years_of_experience")
    private int years_of_experience;

    @Column(name = "monthly_salary")
    private double monthlySalary;

    @Column(name = "num_of_completed_trips")
    private int numOfCompletedTrips;

    @Column(name = "average_rating")
    private double averageRating;
}
