package com.example.diplomski.repository;

import com.example.diplomski.entity.Stop;
import com.example.diplomski.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StopRepository extends JpaRepository<Stop, Long> {
    List<Stop> findAllByTrip(Trip trip);
}
