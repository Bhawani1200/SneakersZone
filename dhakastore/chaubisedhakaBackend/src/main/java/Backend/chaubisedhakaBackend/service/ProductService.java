package Backend.chaubisedhakaBackend.service;


import Backend.chaubisedhakaBackend.payload.AdminProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {

    ProductDTO addProduct(ProductDTO product, Long categoryId);

    ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category, String gender, Integer size, String color, Double minPrice, Double maxPrice, Integer minDiscount, Boolean inStock);

    ProductResponse searchCategoryById(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO);

    ProductDTO deleteProduct(Long productId);

    ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException;

    ProductResponse getAllProductsForAdmin(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getAllProductsForSeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO getProductById(Long productId);

    ProductResponse getProductsByGender(String gender, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    
    // Admin: Create new product
    ProductDTO adminCreateProduct(AdminProductDTO adminProductDTO);

    // Admin: Update existing product
    ProductDTO adminUpdateProduct(Long productId, AdminProductDTO adminProductDTO);

    // Admin: Delete product
    ProductDTO adminDeleteProduct(Long productId);

    // Admin: Get all products (complete list)
    ProductResponse adminGetAllProducts(Integer pageNumber, Integer pageSize,
                                        String sortBy, String sortOrder);

    // Admin: Update product image
    ProductDTO adminUpdateProductImage(Long productId, MultipartFile image) throws IOException;

    // Admin: Get products by category name
    ProductResponse adminGetProductsByCategory(String categoryName, Integer pageNumber,
                                               Integer pageSize, String sortBy, String sortOrder);

    // Admin: Get products by brand
    ProductResponse adminGetProductsByBrand(String brand, Integer pageNumber, Integer pageSize,
                                            String sortBy, String sortOrder);

    // Admin: Get discounted products
    ProductResponse adminGetDiscountedProducts(Integer minDiscount, Integer pageNumber,
                                               Integer pageSize, String sortBy, String sortOrder);

    ProductDTO getSingleProductById(Long productId);
}
