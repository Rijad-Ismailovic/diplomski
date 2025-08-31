package com.example.diplomski.repository;

import com.example.diplomski.entity.Location;
import com.example.diplomski.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findAllByUsername(String username);

}
