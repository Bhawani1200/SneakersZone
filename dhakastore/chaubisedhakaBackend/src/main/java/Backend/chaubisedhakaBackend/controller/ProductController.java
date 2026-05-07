package Backend.chaubisedhakaBackend.controller;


import Backend.chaubisedhakaBackend.config.AppConstants;
import Backend.chaubisedhakaBackend.payload.ProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductResponse;
import Backend.chaubisedhakaBackend.repositories.ProductRepository;
import Backend.chaubisedhakaBackend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductRepository productRepository;

//    @PostMapping("/admin/categories/{categoryId}/product")
//    public ResponseEntity<ProductDTO>addProduct(@Valid  @RequestBody ProductDTO productDTO,
//                                                @PathVariable Long categoryId){
//     ProductDTO savedProductDTO=productService.addProduct(productDTO, categoryId);
//     return new ResponseEntity<>(savedProductDTO, HttpStatus.CREATED);
//    }

//    @GetMapping("/public/search")
//    public ResponseEntity<ProductResponse> searchProducts(
//            @RequestParam(name = "keyword", required = true) String keyword,
//            @RequestParam(name = "page", defaultValue = "0") Integer page,
//            @RequestParam(name = "size", defaultValue = "20") Integer size,
//            @RequestParam(name = "sortBy", defaultValue = "productName") String sortBy,
//            @RequestParam(name = "sortOrder", defaultValue = "asc") String sortOrder) {
//
//        ProductResponse response = productService.searchProductByKeyword(keyword, page, size, sortBy, sortOrder);
//        return ResponseEntity.ok(response);
//    }

    @GetMapping("/public/search")
    public ResponseEntity<ProductResponse> searchProducts(
            @RequestParam(name = "keyword", required = true) String keyword,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "20") Integer size,
            @RequestParam(name = "sortBy", defaultValue = "productName") String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc") String sortOrder) {

        ProductResponse response = productService.searchProductByKeyword(keyword, page, size, sortBy, sortOrder);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/public/search/advanced")
    public ResponseEntity<ProductResponse> advancedSearch(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "brand", required = false) String brand,
            @RequestParam(name = "minPrice", required = false) Double minPrice,
            @RequestParam(name = "maxPrice", required = false) Double maxPrice,
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder) {

        ProductResponse response = productService.advancedSearch(keyword, category, brand, minPrice, maxPrice,
                pageNumber, pageSize, sortBy, sortOrder);
        return ResponseEntity.ok(response);
    }

    // Auto-complete suggestions
    @GetMapping("/public/search/suggestions")
    public ResponseEntity<Map<String, List<String>>> getSearchSuggestions(
            @RequestParam(name = "keyword", required = true) String keyword,
            @RequestParam(name = "limit", defaultValue = "5") int limit) {

        List<String> suggestions = productService.getSearchSuggestions(keyword, limit);
        Map<String, List<String>> response = new HashMap<>();
        response.put("suggestions", suggestions);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse>getAllProducts(
            @RequestParam(name="keyword",required = false) String keyword,
            @RequestParam(name="category",required = false) String category,
            @RequestParam(name="gender",required = false) String gender,
            @RequestParam(name = "size", required = false) Integer size,
            @RequestParam(name = "color", required = false) String color,
            @RequestParam(name = "brand", required = false) String brand,
            @RequestParam(name = "minPrice", defaultValue = "0", required = false) Double minPrice,
            @RequestParam(name = "maxPrice", defaultValue = "4499", required = false) Double maxPrice,
            @RequestParam(name = "minDiscount", required = false) Integer minDiscount,
            @RequestParam(name = "inStock", required = false) Boolean inStock,
            @RequestParam(name="pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(name="pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
            @RequestParam(name="sortBy",defaultValue = AppConstants.SORT_PRODUCTS_BY,required = false)String sortBy,
            @RequestParam(name="sortOrder",defaultValue = AppConstants.SORT_DIR,required = false) String sortOrder
    ){
        ProductResponse productResponse=productService.getAllProducts(
                pageNumber,pageSize,sortBy,sortOrder,keyword,category,gender, size, color,brand, minPrice, maxPrice, minDiscount, inStock
        );
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @GetMapping("/public/products/{productId}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long productId) {
        ProductDTO productDTO = productService.getProductById(productId);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse>getProductsByCategory(@PathVariable Long categoryId,
                                                                @RequestParam(name="pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
                                                                @RequestParam(name="pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
                                                                @RequestParam(name="sortBy",defaultValue = AppConstants.SORT_PRODUCTS_BY,required = false)String sortBy,
                                                                @RequestParam(name="sortOrder",defaultValue = AppConstants.SORT_DIR,required = false) String sortOrder){
        ProductResponse productResponse=productService.searchCategoryById(categoryId,pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse>getProductsByKeyword(@PathVariable String keyword,
                                                               @RequestParam(name="pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
                                                               @RequestParam(name="pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false)Integer pageSize,
                                                               @RequestParam(name="sortBy",defaultValue = AppConstants.SORT_PRODUCTS_BY,required = false)String sortBy,
                                                               @RequestParam(name="sortOrder",defaultValue = AppConstants.SORT_DIR,required = false) String sortOrder){
        ProductResponse productResponse=productService.searchProductByKeyword(keyword,pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.FOUND);
    }

    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO>updateProduct(@Valid @RequestBody ProductDTO productDTO,
                                                         @PathVariable Long productId){
        ProductDTO productResponse=productService.updateProduct(productId,productDTO);
        return  new ResponseEntity<>(productResponse,HttpStatus.OK);

    }



//    @DeleteMapping("/admin/product/{productId}")
//    public ResponseEntity<ProductDTO>deleteProduct(@PathVariable Long productId){
//        ProductDTO deletedProduct=productService.deleteProduct(productId);
//        return new ResponseEntity<>(deletedProduct,HttpStatus.OK);
//    }


//    @PutMapping("/admin/products/{productId}/image")
//    public ResponseEntity<ProductDTO>updateProductImage(@PathVariable Long productId,
//                                                        @RequestParam("image")MultipartFile image) throws IOException {
//        ProductDTO updatedProduct=productService.updateProductImage(productId,image);
//        return new ResponseEntity<>(updatedProduct,HttpStatus.OK);
//    }


//    @GetMapping("/admin/products")
//    public ResponseEntity<ProductResponse> getAllProductsForAdmin(
//            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
//            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
//            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
//            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
//    ){
//        ProductResponse productResponse = productService.getAllProductsForAdmin(pageNumber, pageSize, sortBy, sortOrder);
//        return new ResponseEntity<>(productResponse,HttpStatus.OK);
//    }

    @GetMapping("/seller/products")
    public ResponseEntity<ProductResponse> getAllProductsForSeller(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ){
        ProductResponse productResponse = productService.getAllProductsForSeller(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @GetMapping("/public/products/gender/{gender}")
    public ResponseEntity<ProductResponse> getProductsByGender(
            @PathVariable String gender,
            @RequestParam(defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
            @RequestParam(defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ) {
        ProductResponse products = productService.getProductsByGender(gender, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PutMapping("/seller/products/{productId}")
    public ResponseEntity<ProductDTO> updateProductSeller(@Valid @RequestBody ProductDTO productDTO,
                                                          @PathVariable Long productId){
        ProductDTO updatedProductDTO = productService.updateProduct(productId, productDTO);
        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @DeleteMapping("/seller/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProductSeller(@PathVariable Long productId){
        ProductDTO deletedProduct = productService.deleteProduct(productId);
        return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
    }

    @PutMapping("/seller/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImageSeller(@PathVariable Long productId,
                                                               @RequestParam("image")MultipartFile image) throws IOException {
        ProductDTO updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @GetMapping("/public/filters/sizes")
    public ResponseEntity<List<String>> getAllAvailableSizes() {
        try {
            List<String> sizes = productRepository.findAllUniqueSizesNumeric();
            return ResponseEntity.ok(sizes);
        } catch (Exception e) {

            List<String> sizes = productRepository.findAllUniqueSizes();
            return ResponseEntity.ok(sizes);
        }
    }

    @GetMapping("/public/filters/colors")
    public ResponseEntity<List<String>> getAllAvailableColors() {
        List<String> colors = productRepository.findAllUniqueColors();
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/public/filters/brands")
    public ResponseEntity<List<String>> getAllAvailableBrands() {
        List<String> brands = productRepository.findAllUniqueBrands();
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/public/filters/categories")
    public ResponseEntity<List<String>> getAllAvailableCategories() {
        List<String> categories = productRepository.findAllUniqueCategories();
        return ResponseEntity.ok(categories);
    }
}
