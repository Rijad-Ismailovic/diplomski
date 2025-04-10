package com.example.diplomski.dto;

import com.example.diplomski.common.enums.StopType;
import com.example.diplomski.entity.Location;
import com.example.diplomski.entity.Trip;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StopDto {
    private Long id;
    private Long tripId;
    private Location locationId;
    private StopType type;
    private LocalDate date;
    private LocalTime time;
    private Integer sequence;
}
