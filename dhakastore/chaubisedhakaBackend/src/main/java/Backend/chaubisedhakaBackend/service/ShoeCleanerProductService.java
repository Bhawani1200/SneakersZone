package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.payload.ShoeCleanerProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ShoeCleanerProductService {

    ShoeCleanerProductDTO createProduct(ShoeCleanerProductDTO productDTO);

    ShoeCleanerProductDTO updateProduct(Long productId, ShoeCleanerProductDTO productDTO);

    ShoeCleanerProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException;

    ShoeCleanerProductDTO getProductById(Long productId);

    ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getProductsByCategoryName(String categoryName, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getProductsByBrand(String brand, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getDiscountedProducts(Integer minDiscount, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse adminGetAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ShoeCleanerProductDTO adminUpdateProductImage(Long productId, MultipartFile image) throws IOException;

    void deleteProduct(Long productId);
}
