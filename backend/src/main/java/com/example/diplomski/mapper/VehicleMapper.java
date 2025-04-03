package com.example.diplomski.mapper;

import com.example.diplomski.dto.VehicleDto;
import com.example.diplomski.entity.Vehicle;

public class VehicleMapper {
    public static VehicleDto mapToVehicleDto(Vehicle vehicle){
        return new VehicleDto(
                vehicle.getId(),
                vehicle.getNumOfSeats(),
                vehicle.getFuelCapacityLiters(),
                vehicle.getLicensePlate(),
                vehicle.getYearOfManufacture(),
                vehicle.getModel(),
                vehicle.getManufacturer(),
                vehicle.getFuelType(),
                vehicle.getStatus(),
                vehicle.getMileageKm(),
                vehicle.getLastServiceDate(),
                vehicle.getLastServiceMileage(),
                vehicle.getNextServiceMileage(),
                vehicle.isHasWifi(),
                vehicle.isHasAC(),
                vehicle.isHasRestroom()
        );
    }

    public static Vehicle mapToVehicle(VehicleDto vehicleDto){
        return new Vehicle(
                vehicleDto.getId(),
                vehicleDto.getNumOfSeats(),
                vehicleDto.getFuelCapacityLiters(),
                vehicleDto.getLicensePlate(),
                vehicleDto.getYearOfManufacture(),
                vehicleDto.getModel(),
                vehicleDto.getManufacturer(),
                vehicleDto.getFuelType(),
                vehicleDto.getStatus(),
                vehicleDto.getMileageKm(),
                vehicleDto.getLastServiceDate(),
                vehicleDto.getLastServiceMileage(),
                vehicleDto.getNextServiceMileage(),
                vehicleDto.isHasWifi(),
                vehicleDto.isHasAC(),
                vehicleDto.isHasRestroom()
        );
    }
}
