package com.example.diplomski.controller;

import com.example.diplomski.dto.TicketDto;
import com.example.diplomski.service.TicketService;
import com.example.diplomski.service.UserService;
import com.example.diplomski.service.impl.JWTService;
import com.example.diplomski.service.impl.UserServiceImpl;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/tickets")
public class TicketController {
    private TicketService TicketService;
    private JWTService jwtService;
    private UserService userService;

    @RequestMapping("/{id}")
    public ResponseEntity<TicketDto> getTicketById(@PathVariable("id") Long id){
        TicketDto ticketDto = TicketService.getTicketById(id);
        return ResponseEntity.ok(ticketDto);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<TicketDto>> getAllTicketsByUserUsername(@PathVariable String username) {
        List<TicketDto> tickets = TicketService.getTicketsByUsername(username);
        return ResponseEntity.ok(tickets);
    }


    @PostMapping
    public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto, @RequestHeader("Authorization") String authHeader){
        String token = authHeader.substring(7); // strip "Bearer "
        String userId = jwtService.extractSub(token); // subject from JWT
        String fullName = this.userService.getUserByUsername(userId).getFullName();
        ticketDto.setFullName(fullName);
        ticketDto.setUsername(userId);
        ticketDto.setDateOfCreation(LocalDate.now());
        ticketDto.setStatus("active");

        TicketDto savedTicketDto = TicketService.createTicket(ticketDto);
        return new ResponseEntity<>(savedTicketDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketDto> updateTicket(@PathVariable("id") Long id, @RequestBody TicketDto ticketDto){
        TicketDto updatedTicketDto = TicketService.updateTicket(id, ticketDto);
        return ResponseEntity.ok(updatedTicketDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable("id") Long id){
        TicketService.deleteTicket(id);
        return ResponseEntity.ok("Ticket with given ID deleted successfully: " + id);
    }

}
