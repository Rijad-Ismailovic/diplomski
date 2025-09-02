package com.example.diplomski.service.impl;

import com.example.diplomski.dto.TicketDto;
import com.example.diplomski.entity.Location;
import com.example.diplomski.entity.User;
import com.example.diplomski.repository.LocationRepository;
import com.example.diplomski.repository.UserRepository;
import com.example.diplomski.service.LocationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;

     public EmailService(@Autowired(required = false) JavaMailSender mailSender,
                        UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    /** Public API: caller passes userId. We fetch user -> email and send. */
    public void emailTicketToUser(Long userId, TicketDto ticket) throws MessagingException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found id=" + userId));

        String to = user.getEmail();
        if (!StringUtils.hasText(to)) {
            log.warn("No recipient email available for user id={} (ticket id={})",
                    userId, ticket != null ? ticket.getId() : null);
            return; // or throw if you prefer
        }

        // Enrich ticket DTO with user info if missing (helps your template)
        if (ticket != null) {
            if (!StringUtils.hasText(ticket.getFullName())) ticket.setFullName(user.getFullName());
            if (!StringUtils.hasText(ticket.getUsername()))  ticket.setUsername(user.getUsername());
        }

        String subject = "Your bus ticket"
                + ((ticket != null && ticket.getId() != null) ? (" #" + ticket.getId()) : "");

        String fromLocationName = String.valueOf(this.locationRepository.findById(ticket.getDepartureLocation().getId()));
        String toLocationName = String.valueOf(this.locationRepository.findById(ticket.getArrivalLocation().getId()));

        String html = (ticket != null) ? buildGlobalBusTicketHtml(ticket, fromLocationName, toLocationName)
                : "<p>Hello " + (user.getFullName() == null ? "there" : user.getFullName())
                + ",</p><p>Your ticket details will follow.</p>";

        sendHtmlEmail(to, subject, html);
    }

    /* --- keep your existing helpers below --- */

    public void sendEmail(String receiverEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rijad.isma@gmail.com"); // must match your authenticated sender
        message.setTo("rijad.isma@gmail.com");
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
    }

    public void sendHtmlEmail(String to, String subject, String html) throws MessagingException {
        MimeMessage msg = mailSender.createMimeMessage();

        // true = multipart
        MimeMessageHelper helper = new MimeMessageHelper(msg, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        helper.setFrom("rijad.isma@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        // Plain-text fallback (brief)
        String textFallback = "Your bus ticket is attached below. If you cannot see the HTML, please enable HTML view.";

        // Build multipart/alternative manually so text is first
        var alt = new jakarta.mail.internet.MimeMultipart("alternative");

        var textPart = new jakarta.mail.internet.MimeBodyPart();
        textPart.setText(textFallback, StandardCharsets.UTF_8.name());
        alt.addBodyPart(textPart);

        var htmlPart = new jakarta.mail.internet.MimeBodyPart();
        htmlPart.setContent(html, "text/html; charset=UTF-8");
        alt.addBodyPart(htmlPart);

        msg.setContent(alt);
        mailSender.send(msg);
    }

    public static String buildGlobalBusTicketHtml(TicketDto t, String fromLocationName, String toLocationName) {
        // Resolve display values (keep it null-safe)
        String passenger = safe(t.getFullName());
        String ticketId  = t.getId() != null ? String.valueOf(t.getId()) : "—";
        String depDate   = t.getDepartureDate() != null ? t.getDepartureDate().toString() : "";
        String depTime   = t.getDepartureTime() != null ? t.getDepartureTime().toString() : "";
        String arrDate   = t.getArrivalDate() != null ? t.getArrivalDate().toString() : "";
        String arrTime   = t.getArrivalTime() != null ? t.getArrivalTime().toString() : "";
        String price     = formatPrice(t.getPrice());

        return String.format("""
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ticket</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6fb;">
    <center style="width:100%%; background-color:#f4f6fb;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%%" style="background-color:#f4f6fb;">
        <tr>
          <td align="center" style="padding:24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:100%%; background:#ffffff; border-radius:8px; border:1px solid #e5e7eb;">
              <tr>
                <td style="padding:20px 24px; font-family:Arial,Helvetica,sans-serif; color:#0b1f44; font-size:20px; font-weight:bold;">
                  Global • Bus Ticket #%s
                </td>
              </tr>
              <tr>
                <td style="padding:0 24px 12px 24px; font-family:Arial,Helvetica,sans-serif; color:#334155; font-size:14px;">
                  Passenger: <strong>%s</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:0 24px 16px 24px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%%" style="border:1px solid #e2e8f0; border-radius:6px;">
                    <tr>
                      <td style="padding:12px 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#0b1f44; line-height:1.5;">
                        <div><strong>From:</strong> %s</div>
                        <div><strong>To:</strong> %s</div>
                        <div><strong>Departure:</strong> %s %s</div>
                        <div><strong>Arrival:</strong> %s %s</div>
                        <div><strong>Price:</strong> %s</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px 24px 24px; font-family:Arial,Helvetica,sans-serif; color:#64748b; font-size:12px; line-height:1.5;">
                  If you did not purchase this ticket, please contact support.
                </td>
              </tr>
            </table>
            <div style="height:12px; line-height:12px;">&nbsp;</div>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
""",
                ticketId, passenger,
                fromLocationName, toLocationName,
                depDate, depTime,
                arrDate, arrTime,
                price
        );
    }


    private static String formatLocation(Object loc) { return loc == null ? "" : String.valueOf(loc); }

    public void sendHtmlContactUsEmail(String fullName, String fromEmail, String body) throws MessagingException {
        MimeMessage msg = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(
                msg,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name()
        );

        helper.setFrom("rijad.isma@gmail.com");
        helper.setTo("rijad.isma@gmail.com");
        helper.setSubject("New Contact Us Message from " + fullName);

        // Plain text fallback
        String textFallback = "New message from " + fullName + " (" + fromEmail + "): " + body;

        // Build nice HTML
        String html = """
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Contact Us</title>
  </head>
  <body style="margin:0; padding:20px; font-family:Arial,Helvetica,sans-serif; background-color:#f9fafb;">
    <center style="width:100%%;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" 
             style="max-width:600px; background:#ffffff; border-radius:8px; border:1px solid #e5e7eb;">
        <tr>
          <td style="padding:20px; background:#0b1f44; color:#ffffff; font-size:20px; font-weight:bold; border-radius:8px 8px 0 0;">
            📧 New Contact Us Message
          </td>
        </tr>
        <tr>
          <td style="padding:20px; font-size:14px; color:#334155;">
            <p><strong>Name:</strong> %s</p>
            <p><strong>Email:</strong> %s</p>
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />
            <p style="white-space:pre-wrap;">%s</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px; font-size:12px; color:#64748b; border-top:1px solid #e5e7eb;">
            This message was submitted via the Contact Us form.
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
""".formatted(fullName, fromEmail, body);

        // Multipart/alternative (text + html)
        var alt = new jakarta.mail.internet.MimeMultipart("alternative");

        var textPart = new jakarta.mail.internet.MimeBodyPart();
        textPart.setText(textFallback, StandardCharsets.UTF_8.name());
        alt.addBodyPart(textPart);

        var htmlPart = new jakarta.mail.internet.MimeBodyPart();
        htmlPart.setContent(html, "text/html; charset=UTF-8");
        alt.addBodyPart(htmlPart);

        msg.setContent(alt);
        mailSender.send(msg);
    }


    private static String formatDuration(int minutes) {
        if (minutes <= 0) return "—";
        int h = minutes / 60, m = minutes % 60;
        return h > 0 ? (m > 0 ? h + "h " + m + "m" : h + "h") : m + "m";
    }
    private static String formatPrice(double p) { return p <= 0 ? "—" : String.format("€%.2f", p); }
    private static String amenityBadge(String label, boolean ok) {
        String bg  = ok ? "#e8f3ff" : "#f1f5f9";
        String col = ok ? "#0b4f9c" : "#94a3b8";
        String brd = ok ? "#cfe2fb" : "#e2e8f0";
        String icon = switch (label) {
            case "Wi-Fi" -> "📶"; case "Restroom" -> "🚻"; case "A/C" -> "❄️";
            case "Power" -> "🔌"; case "Reclining" -> "💺"; default -> "•";
        };
        return """
        <span style="display:inline-block;margin:4px 6px 0 0;padding:6px 10px;border:1px solid %s;border-radius:999px;
                     background:%s;color:%s;font-size:12px;font-weight:600;line-height:1;">
          <span style="margin-right:6px;">%s</span>%s
        </span>
        """.formatted(brd, bg, col, icon, label);
    }

    public void sendReviewNotificationEmail(String username, Long ticketId, int rating, String comment) throws MessagingException {
        MimeMessage msg = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(
                msg,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name()
        );

        helper.setFrom("rijad.isma@gmail.com");
        helper.setTo("rijad.isma@gmail.com"); // always admin email
        helper.setSubject("📝 New Review Submitted (Ticket #" + ticketId + ")");

        // plain-text fallback
        String textFallback = "New review from " + username +
                " (Ticket #" + ticketId + "):\nRating: " + rating +
                "\nComment: " + comment;

        // HTML email body
        String html = """
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Review</title>
  </head>
  <body style="margin:0; padding:20px; font-family:Arial,Helvetica,sans-serif; background-color:#f9fafb;">
    <center style="width:100%%;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" 
             style="max-width:600px; background:#ffffff; border-radius:8px; border:1px solid #e5e7eb;">
        <tr>
          <td style="padding:20px; background:#0b1f44; color:#ffffff; font-size:20px; font-weight:bold; border-radius:8px 8px 0 0;">
            📝 New Ticket Review Submitted
          </td>
        </tr>
        <tr>
          <td style="padding:20px; font-size:14px; color:#334155;">
            <p><strong>User:</strong> %s</p>
            <p><strong>Ticket ID:</strong> %s</p>
            <p><strong>Rating:</strong> %s ★</p>
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />
            <p style="white-space:pre-wrap;">%s</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px; font-size:12px; color:#64748b; border-top:1px solid #e5e7eb;">
            This review was submitted via the Finished Tickets review modal.
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
""".formatted(username, ticketId, rating, comment);

        // multipart text + html
        var alt = new jakarta.mail.internet.MimeMultipart("alternative");

        var textPart = new jakarta.mail.internet.MimeBodyPart();
        textPart.setText(textFallback, StandardCharsets.UTF_8.name());
        alt.addBodyPart(textPart);

        var htmlPart = new jakarta.mail.internet.MimeBodyPart();
        htmlPart.setContent(html, "text/html; charset=UTF-8");
        alt.addBodyPart(htmlPart);

        msg.setContent(alt);
        mailSender.send(msg);
    }

    private static String safe(String s) { return s == null ? "" : s; }
}
