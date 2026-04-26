package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.model.Contact;
import Backend.chaubisedhakaBackend.payload.ContactRequestDTO;
import Backend.chaubisedhakaBackend.repositories.ContactRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Value("${contact.email.to:admin@ecommerce.com}")
    private String emailTo;

    private static final Logger log = LoggerFactory.getLogger(ContactServiceImpl.class);

    public ContactServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void processContactForm(ContactRequestDTO contactRequest) {

        try {

            Contact contact = Contact.builder()
                    .name(contactRequest.getName())
                    .email(contactRequest.getEmail())
                    .message(contactRequest.getMessage())
                    .status(Contact.Status.UNREAD)
                    .createdAt(LocalDateTime.now())
                    .build();

            Contact savedContact = contactRepository.save(contact);
            log.info("Contact saved to database with ID: {}", savedContact.getId());

            sendEmailNotification(contactRequest);

        } catch (Exception e) {
            log.error("Error processing contact form: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to process contact form: " + e.getMessage());
        }
    }


    @Override
    @Transactional(readOnly = true)
    public Page<Contact> getAllContacts(Pageable pageable) {
        log.info("Fetching all contacts with pagination");
        return contactRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly=true)
    public Contact getContactById(Long id) {
        log.info("Fetching contact with ID: {}", id);
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    @Override
    public Contact updateContactStatus(Long id, Contact.Status status) {
        log.info("Updating contact status for ID: {} to {}", id, status);
        Contact contact = getContactById(id);
        contact.setStatus(status);
        return contactRepository.save(contact);
    }

    @Override
    public Contact addAdminNotes(Long id, String notes) {
        log.info("Adding admin notes for contact ID: {}", id);
        Contact contact = getContactById(id);
        contact.setAdminNotes(notes);
        return contactRepository.save(contact);
    }

    @Override
    public void deleteContact(Long id) {
        log.info("Deleting contact with ID: {}", id);
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly=true)
    public long getUnreadCount() {
        log.info("Fetching unread contacts count");
        return contactRepository.countByStatus(Contact.Status.UNREAD);
    }

    @Override
    public Page<Contact> searchContacts(String keyword, Pageable pageable) {
        log.info("Searching contacts with keyword: {}", keyword);
        return contactRepository.searchContacts(keyword, pageable);
    }

    @Override
    public Contact markAsRead(Long id) {
        log.info("Marking contact as read for ID: {}", id);
        return updateContactStatus(id, Contact.Status.READ);
    }
    private void sendEmailNotification(ContactRequestDTO contactRequest) {
        try {
            if (emailFrom == null || emailFrom.isEmpty()) {
                log.warn("Email sender not configured, skipping email notification");
                return;
            }

            if (emailTo == null || emailTo.isEmpty()) {
                log.warn("Email recipient not configured, skipping email notification");
                return;
            }

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(emailFrom);
            helper.setTo(emailTo);
            helper.setReplyTo(contactRequest.getEmail());
            helper.setSubject("New Contact Message from " + contactRequest.getName());

            String htmlContent = buildEmailHtml(contactRequest);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
            log.info("Email notification sent successfully to: {}", emailTo);

        } catch (MessagingException e) {
            log.error("Failed to send email: {}", e.getMessage(), e);
            // Don't throw exception here - email failure shouldn't stop the contact submission
            // Just log the error
        } catch (Exception e) {
            log.error("Unexpected error while sending email: {}", e.getMessage(), e);
        }
    }

    private String buildEmailHtml(ContactRequestDTO contactRequest) {
        return String.format("""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                    }
                    .header {
                        background: linear-gradient(135deg, #2563eb 0%%, #1e40af 100%%);
                        color: white;
                        padding: 30px 20px;
                        text-align: center;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 30px;
                        background-color: #f9fafb;
                    }
                    .field {
                        margin-bottom: 25px;
                        background: white;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    .label {
                        font-weight: bold;
                        color: #2563eb;
                        margin-bottom: 8px;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .value {
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.5;
                        word-wrap: break-word;
                    }
                    .timestamp {
                        text-align: center;
                        color: #6b7280;
                        font-size: 12px;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e5e7eb;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📬 New Contact Form Submission</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">👤 Name</div>
                            <div class="value">%s</div>
                        </div>
                        <div class="field">
                            <div class="label">📧 Email</div>
                            <div class="value">%s</div>
                        </div>
                        <div class="field">
                            <div class="label">💬 Message</div>
                            <div class="value">%s</div>
                        </div>
                        <div class="timestamp">
                            Submitted at: %s
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """,
                escapeHtml(contactRequest.getName()),
                escapeHtml(contactRequest.getEmail()),
                escapeHtml(contactRequest.getMessage()).replace("\n", "<br>"),
                LocalDateTime.now().toString()
        );
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
