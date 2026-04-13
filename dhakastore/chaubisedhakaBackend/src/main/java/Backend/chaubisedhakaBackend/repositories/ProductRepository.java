package Backend.chaubisedhakaBackend.repositories;

import Backend.chaubisedhakaBackend.model.Category;
import Backend.chaubisedhakaBackend.model.Gender;
import Backend.chaubisedhakaBackend.model.Product;
import Backend.chaubisedhakaBackend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> , JpaSpecificationExecutor<Product> {

    Page<Product> findByCategoryOrderByPriceAsc(Category category, Pageable pageDetails);

    Page<Product> findByProductNameLikeIgnoreCase(String keyword, Pageable pageDetails);

    Page<Product> findByUser(User user, Pageable pageDetails);

    Page<Product> findByGender(Gender gender, Pageable pageable);

    // Admin specific methods
    boolean existsByProductName(String productName);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:keyword% OR p.description LIKE %:keyword%")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.categoryName = :categoryName")
    Page<Product> findByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.brand = :brand")
    Page<Product> findByBrand(@Param("brand") String brand, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.discount >= :minDiscount")
    Page<Product> findProductsByMinDiscount(@Param("minDiscount") Integer minDiscount, Pageable pageable);
}
