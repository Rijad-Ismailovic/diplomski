package com.example.diplomski.service;

import com.example.diplomski.dto.TicketDto;

import java.util.List;

public interface TicketService {
    TicketDto getTicketById(Long id);

    List<TicketDto> getAllTickets();

    TicketDto createTicket(TicketDto ticketDto);

    TicketDto updateTicket(Long id, TicketDto ticketDto);

    void deleteTicket(Long id);

    List<TicketDto> getTicketsByUsername(String username);
}
