package Backend.chaubisedhakaBackend.repositories;

import Backend.chaubisedhakaBackend.model.ShoeCleanerProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoeCleanerProductRepository extends JpaRepository<ShoeCleanerProduct, Long> {
    Page<ShoeCleanerProduct> findByShoeCleanerCategory_CategoryId(Long categoryId, Pageable pageable);

    Page<ShoeCleanerProduct> findByShoeCleanerCategory_CategoryName(String categoryName, Pageable pageable);

    Page<ShoeCleanerProduct> findByBrand(String brand, Pageable pageable);

    Page<ShoeCleanerProduct> findByDiscountGreaterThanEqual(Integer minDiscount, Pageable pageable);

    Page<ShoeCleanerProduct> findByInStockTrue(Pageable pageable);

    boolean existsByProductName(String productName);
}
