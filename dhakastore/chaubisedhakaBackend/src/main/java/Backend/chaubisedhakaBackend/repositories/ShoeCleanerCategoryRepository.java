package Backend.chaubisedhakaBackend.repositories;

import Backend.chaubisedhakaBackend.model.ShoeCleanerCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoeCleanerCategoryRepository extends JpaRepository<ShoeCleanerCategory, Long> {

    Optional<ShoeCleanerCategory> findByCategoryName(String categoryName);

    Optional<ShoeCleanerCategory> findByCategoryNameIgnoreCase(String categoryName);

    List<ShoeCleanerCategory> findByActiveTrue();
}
