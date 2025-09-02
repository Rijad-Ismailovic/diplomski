package com.example.diplomski.service.impl;

import com.example.diplomski.dto.TicketDto;
import com.example.diplomski.entity.User;
import com.example.diplomski.repository.LocationRepository;
import com.example.diplomski.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class EmailService {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private JavaMailSender mailSender; // nullable

    @Autowired
    public EmailService(UserRepository userRepository,
                        LocationRepository locationRepository,
                        @Autowired(required = false) JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
        this.mailSender = mailSender;
    }

    /** Public API: caller passes userId. We fetch user -> email and send. */
    public void emailTicketToUser(Long userId, TicketDto ticket) throws MessagingException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found id=" + userId));

        if (mailSender == null) {
            log.warn("No JavaMailSender configured. Email not sent for user {}", userId);
            return;
        }

        String to = user.getEmail();
        if (!StringUtils.hasText(to)) {
            log.warn("No recipient email available for user id={} (ticket id={})",
                    userId, ticket != null ? ticket.getId() : null);
            return;
        }

        String subject = "Your bus ticket"
                + ((ticket != null && ticket.getId() != null) ? (" #" + ticket.getId()) : "");

        String fromLocationName = String.valueOf(locationRepository.findById(ticket.getDepartureLocation().getId()));
        String toLocationName = String.valueOf(locationRepository.findById(ticket.getArrivalLocation().getId()));

        String html = (ticket != null) ? buildGlobalBusTicketHtml(ticket, fromLocationName, toLocationName)
                : "<p>Hello " + (user.getFullName() == null ? "there" : user.getFullName())
                + ",</p><p>Your ticket details will follow.</p>";

        sendHtmlEmail(to, subject, html);
    }

    public void sendEmail(String receiverEmail, String subject, String body) {
        if (mailSender == null) {
            log.warn("No JavaMailSender configured. Email not sent to {}", receiverEmail);
            return;
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rijad.isma@gmail.com");
        message.setTo(receiverEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
    }

    public void sendHtmlEmail(String to, String subject, String html) throws MessagingException {
        if (mailSender == null) {
            log.warn("No JavaMailSender configured. HTML email not sent to {}", to);
            return;
        }
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                msg, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name()
        );
        helper.setFrom("rijad.isma@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html, true);
        mailSender.send(msg);
    }

    // ---------------------------
    //  HELPER METHODS
    // ---------------------------

    public static String buildGlobalBusTicketHtml(TicketDto t, String fromLocationName, String toLocationName) {
        String passenger = safe(t.getFullName());
        String ticketId  = t.getId() != null ? String.valueOf(t.getId()) : "—";
        String depDate   = t.getDepartureDate() != null ? t.getDepartureDate().toString() : "";
        String depTime   = t.getDepartureTime() != null ? t.getDepartureTime().toString() : "";
        String arrDate   = t.getArrivalDate() != null ? t.getArrivalDate().toString() : "";
        String arrTime   = t.getArrivalTime() != null ? t.getArrivalTime().toString() : "";
        String price     = formatPrice(t.getPrice());

        return String.format("<html><body><h1>Ticket %s</h1><p>Passenger: %s</p><p>From %s to %s</p>"
                + "<p>Departure: %s %s</p><p>Arrival: %s %s</p><p>Price: %s</p></body></html>",
                ticketId, passenger, fromLocationName, toLocationName,
                depDate, depTime, arrDate, arrTime, price);
    }

    public void sendHtmlContactUsEmail(String fullName, String fromEmail, String body) throws MessagingException {
        if (mailSender == null) {
            log.warn("No JavaMailSender configured. Contact email not sent.");
            return;
        }
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                msg, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name()
        );
        helper.setFrom("rijad.isma@gmail.com");
        helper.setTo("rijad.isma@gmail.com");
        helper.setSubject("New Contact Us Message from " + fullName);
        helper.setText("Name: " + fullName + "\nEmail: " + fromEmail + "\n\n" + body, true);
        mailSender.send(msg);
    }

    public void sendReviewNotificationEmail(String username, Long ticketId, int rating, String comment) throws MessagingException {
        if (mailSender == null) {
            log.warn("No JavaMailSender configured. Review notification not sent.");
            return;
        }
        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                msg, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name()
        );
        helper.setFrom("rijad.isma@gmail.com");
        helper.setTo("rijad.isma@gmail.com");
        helper.setSubject("New Review for Ticket #" + ticketId);
        helper.setText("User: " + username + "\nRating: " + rating + "\nComment: " + comment, true);
        mailSender.send(msg);
    }

    private static String safe(String s) { return s == null ? "" : s; }
    private static String formatPrice(double p) { return p <= 0 ? "—" : String.format("€%.2f", p); }
}
