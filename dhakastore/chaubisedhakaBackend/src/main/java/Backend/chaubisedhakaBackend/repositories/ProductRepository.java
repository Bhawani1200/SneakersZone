package Backend.chaubisedhakaBackend.repositories;

import Backend.chaubisedhakaBackend.model.Category;
import Backend.chaubisedhakaBackend.model.Gender;
import Backend.chaubisedhakaBackend.model.Product;
import Backend.chaubisedhakaBackend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> , JpaSpecificationExecutor<Product> {

    Page<Product> findByCategoryOrderByPriceAsc(Category category, Pageable pageDetails);

    Page<Product> findByProductNameLikeIgnoreCase(String keyword, Pageable pageDetails);

    Page<Product> findByUser(User user, Pageable pageDetails);

    Page<Product> findByGender(Gender gender, Pageable pageable);


}
