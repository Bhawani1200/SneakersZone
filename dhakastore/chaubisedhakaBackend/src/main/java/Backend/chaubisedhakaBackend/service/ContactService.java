package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.model.Contact;
import Backend.chaubisedhakaBackend.payload.ContactRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactService {


    void processContactForm(ContactRequestDTO contactRequest);


    Page<Contact> getAllContacts(Pageable pageable);

    Contact getContactById(Long id);

    Contact updateContactStatus(Long id, Contact.Status status);

    Contact addAdminNotes(Long id, String notes);

    void deleteContact(Long id);

    long getUnreadCount();

    Page<Contact> searchContacts(String keyword, Pageable pageable);

    Contact markAsRead(Long id);
}