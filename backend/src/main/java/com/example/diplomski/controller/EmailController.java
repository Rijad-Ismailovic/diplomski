package com.example.diplomski.controller;

import com.example.diplomski.dto.ContactMessageDto;
import com.example.diplomski.dto.TicketDto;
import com.example.diplomski.service.impl.EmailService;
import com.example.diplomski.service.impl.JWTService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/emails")
public class EmailController {

    private final EmailService emailService;
    private final JWTService jwtService;

    /**
     * Send a plain text email (subject + body).
     */
    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String body
    ) {
        emailService.sendEmail(to, subject, body);
        return ResponseEntity.ok("Email sent successfully to " + to);
    }

    /**
     * Send a ticket confirmation email to the currently authenticated user.
     * The frontend should pass the TicketDto in the request body and the JWT in Authorization header.
     */
    @PostMapping("/ticket")
    public ResponseEntity<String> sendTicketEmail(
            @RequestBody TicketDto ticketDto,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            String token = authHeader.substring(7); // strip "Bearer "
            String userId = jwtService.extractSub(token);
            // forward to EmailService
            emailService.emailTicketToUser(Long.valueOf(userId), ticketDto);
            return new ResponseEntity<>("Ticket email sent successfully", HttpStatus.OK);
        } catch (MessagingException e) {
            return new ResponseEntity<>("Failed to send ticket email: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/contact")
    public ResponseEntity<String> sendContactUsEmail(@RequestBody ContactMessageDto dto) {
        try {
            emailService.sendHtmlContactUsEmail(dto.getFullName(), dto.getFromEmail(), dto.getBody());
            return ResponseEntity.ok("Contact email sent successfully.");
        } catch (MessagingException e) {
            return new ResponseEntity<>("Failed to send contact email: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
