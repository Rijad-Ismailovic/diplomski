package com.example.diplomski.dto;

import com.example.diplomski.common.enums.Country;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LocationDto {
    private Long id;
    private String name;
    private Country country;
    private Double latitude;
    private Double longitude;
    private String imagePath;
}
