package com.example.diplomski.mapper;

import com.example.diplomski.dto.TicketDto;
import com.example.diplomski.entity.Ticket;
import com.example.diplomski.entity.Driver;

public class TicketMapper {

    public static TicketDto mapToTicketDto(Ticket ticket) {
        return new TicketDto(
                ticket.getId(),
                ticket.getDriver() != null ? ticket.getDriver().getId() : null,
                ticket.getDepartureLocation(),
                ticket.getDepartureTime(),
                ticket.getDepartureDate(),
                ticket.getArrivalLocation(),
                ticket.getArrivalTime(),
                ticket.getArrivalDate(),
                ticket.getDistanceKm(),
                ticket.getDurationMinutes(),
                ticket.getPrice(),
                ticket.isHasWifi(),
                ticket.isHasRestroom(),
                ticket.isHasAc(),
                ticket.isHasOutlet(),
                ticket.isHasReclining(),
                ticket.getFullName(),
                ticket.getUsername(),
                ticket.getDateOfCreation(),
                ticket.getStatus()
        );
    }

    public static Ticket mapToTicket(TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDto.getId());

        // Only set Driver reference by id (to avoid full load)
        if (ticketDto.getDriverId() != null) {
            Driver driver = new Driver();
            driver.setId(ticketDto.getDriverId());
            ticket.setDriver(driver);
        }

        ticket.setDepartureLocation(ticketDto.getDepartureLocation());
        ticket.setDepartureTime(ticketDto.getDepartureTime());
        ticket.setDepartureDate(ticketDto.getDepartureDate());

        ticket.setArrivalLocation(ticketDto.getArrivalLocation());
        ticket.setArrivalTime(ticketDto.getArrivalTime());
        ticket.setArrivalDate(ticketDto.getArrivalDate());

        ticket.setDistanceKm(ticketDto.getDistanceKm());
        ticket.setDurationMinutes(ticketDto.getDurationMinutes());
        ticket.setPrice(ticketDto.getPrice());

        ticket.setHasWifi(ticketDto.isHasWifi());
        ticket.setHasRestroom(ticketDto.isHasRestroom());
        ticket.setHasAc(ticketDto.isHasAc());
        ticket.setHasOutlet(ticketDto.isHasOutlet());
        ticket.setHasReclining(ticketDto.isHasReclining());

        ticket.setFullName(ticketDto.getFullName());
        ticket.setUsername(ticketDto.getUsername());
        ticket.setDateOfCreation(ticketDto.getDateOfCreation());
        ticket.setStatus(ticketDto.getStatus());


        return ticket;
    }
}
