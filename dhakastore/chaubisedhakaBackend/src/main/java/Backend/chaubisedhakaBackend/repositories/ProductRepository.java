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

import java.util.List;

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

    @Query("SELECT DISTINCT s FROM Product p JOIN p.sizes s WHERE s IS NOT NULL AND s != '' ORDER BY s")
    List<String> findAllUniqueSizes();


    @Query(value = "SELECT DISTINCT size_value FROM product_sizes WHERE size_value IS NOT NULL AND size_value != '' ORDER BY size_value::INTEGER", nativeQuery = true)
    List<String> findAllUniqueSizesNumeric();


    @Query(value = "SELECT DISTINCT size_value FROM product_sizes WHERE size_value IS NOT NULL AND size_value != '' ORDER BY CAST(size_value AS INTEGER)", nativeQuery = true)
    List<String> findAllUniqueSizesNumericAlt();

    // Get unique colors
    @Query("SELECT DISTINCT c FROM Product p JOIN p.colors c WHERE c IS NOT NULL AND c != '' ORDER BY c")
    List<String> findAllUniqueColors();

    // Get unique brands
    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.brand IS NOT NULL AND p.brand != '' ORDER BY p.brand")
    List<String> findAllUniqueBrands();

    // Get unique categories
    @Query("SELECT DISTINCT p.category.categoryName FROM Product p WHERE p.category IS NOT NULL ORDER BY p.category.categoryName")
    List<String> findAllUniqueCategories();

    // Get products by size (using collection)
    @Query("SELECT DISTINCT p FROM Product p JOIN p.sizes s WHERE s = :size")
    Page<Product> findBySize(@Param("size") String size, Pageable pageable);

    // Get products by color (using collection)
    @Query("SELECT DISTINCT p FROM Product p JOIN p.colors c WHERE LOWER(c) = LOWER(:color)")
    Page<Product> findByColor(@Param("color") String color, Pageable pageable);

}
