package Backend.chaubisedhakaBackend.repositories;
import Backend.chaubisedhakaBackend.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    Page<Contact> findByStatus(Contact.Status status, Pageable pageable);

    List<Contact> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(c) FROM Contact c WHERE c.status = :status")
    long countByStatus(@Param("status") Contact.Status status);

    @Query("SELECT c FROM Contact c WHERE c.name LIKE %:keyword% OR c.email LIKE %:keyword% OR c.message LIKE %:keyword%")
    Page<Contact> searchContacts(@Param("keyword") String keyword, Pageable pageable);
}