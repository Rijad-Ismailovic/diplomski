package com.example.diplomski.service.impl;

import com.example.diplomski.common.exceptions.ResourceNotFoundException;
import com.example.diplomski.dto.TicketDto;
import com.example.diplomski.entity.Location;
import com.example.diplomski.entity.Ticket;
import com.example.diplomski.entity.User;
import com.example.diplomski.mapper.TicketMapper;
import com.example.diplomski.repository.LocationRepository;
import com.example.diplomski.repository.TicketRepository;
import com.example.diplomski.repository.UserRepository;
import com.example.diplomski.service.LocationService;
import com.example.diplomski.service.TicketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;   // <— added
    private final EmailService emailService;
    private final LocationRepository locationRepository;

    @Override
    public TicketDto getTicketById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket with given ID doesn't exist: " + id));
        return TicketMapper.mapToTicketDto(ticket);
    }

    @Override
    public List<TicketDto> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(TicketMapper::mapToTicketDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<TicketDto> getTicketsByUsername(String username) {
        return ticketRepository.findAllByUsername(username).stream()
                .map(TicketMapper::mapToTicketDto)
                .collect(Collectors.toList());
    }

    @Override
    public TicketDto createTicket(TicketDto ticketDto) {
        // 1) Save first to get a real ID
        Ticket saved = ticketRepository.save(TicketMapper.mapToTicket(ticketDto));
        TicketDto savedDto = TicketMapper.mapToTicketDto(saved);

        // 2) Best-effort email sending based on username -> email lookup
        try {
            String to = resolveRecipientEmail(savedDto); // username -> user -> email
            if (to != null) {
                // Optional: enrich name for the email if missing
                if (savedDto.getFullName() == null || savedDto.getFullName().isBlank()) {
                    User u = userRepository.findByUsername(savedDto.getUsername());
                    if (u != null && u.getFullName() != null) {
                        savedDto.setFullName(u.getFullName());
                    }
                }

                String subject = "Global • Bus Ticket #" + (savedDto.getId() == null ? "" : savedDto.getId());
                Location fromLocation = locationRepository.findById(savedDto.getDepartureLocation().getId())
                        .orElse(null);
                String fromLocationName = (fromLocation != null) ? fromLocation.getName() : "";

                Location toLocation = locationRepository.findById(savedDto.getArrivalLocation().getId())
                        .orElse(null);
                String toLocationName = (toLocation != null) ? toLocation.getName() : "";

                String html = EmailService.buildGlobalBusTicketHtml(savedDto, fromLocationName, toLocationName);
                emailService.sendHtmlEmail(to, subject, html);
            } else {
                log.warn("No recipient email available for ticket id={} (username={})",
                        savedDto.getId(), savedDto.getUsername());
            }
        } catch (Exception ex) {
            log.warn("Failed to send ticket email for id={}: {}", savedDto.getId(), ex.getMessage());
        }

        return savedDto;
    }

    @Override
    public TicketDto updateTicket(Long id, TicketDto ticketDto) {
        Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket with given ID doesn't exist: " + id));

        BeanUtils.copyProperties(ticketDto, existingTicket, "id");

        Ticket updated = ticketRepository.save(existingTicket);
        return TicketMapper.mapToTicketDto(updated);
    }

    @Override
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    /**
     * If the username looks like an email already, use it.
     * Otherwise, fetch User by username and return user.getEmail().
     */
    private String resolveRecipientEmail(TicketDto dto) {
        String uname = dto.getUsername();
        if (uname == null || uname.isBlank()) return null;

        if (uname.contains("@")) return uname.trim();   // username is actually an email

        User u = userRepository.findByUsername(uname);
        if (u == null) return null;

        String email = u.getEmail();
        return (email == null || email.isBlank()) ? null : email.trim();
    }
}
