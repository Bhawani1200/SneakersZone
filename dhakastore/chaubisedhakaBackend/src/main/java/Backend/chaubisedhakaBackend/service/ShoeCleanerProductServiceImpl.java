package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.exceptions.APIException;
import Backend.chaubisedhakaBackend.exceptions.ResourceNotFoundException;
import Backend.chaubisedhakaBackend.model.ShoeCleanerCategory;
import Backend.chaubisedhakaBackend.model.ShoeCleanerProduct;

import Backend.chaubisedhakaBackend.payload.ProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductResponse;
import Backend.chaubisedhakaBackend.payload.ShoeCleanerProductDTO;
import Backend.chaubisedhakaBackend.repositories.ShoeCleanerCategoryRepository;
import Backend.chaubisedhakaBackend.repositories.ShoeCleanerProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class ShoeCleanerProductServiceImpl implements ShoeCleanerProductService {

    @Autowired
    private ShoeCleanerProductRepository productRepository;

    @Autowired
    private ShoeCleanerCategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CloudinaryImageService cloudinaryImageService;

    @Value("${image.base.url}")
    private String imageBaseUrl;


    @Override
    public ShoeCleanerProductDTO createProduct(ShoeCleanerProductDTO productDTO) {
        ShoeCleanerCategory category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerCategory", "categoryId", productDTO.getCategoryId()));

        // Check if product already exists
        if (productRepository.existsByProductName(productDTO.getProductName())) {
            throw new APIException("Product with name '" + productDTO.getProductName() + "' already exists!");
        }

        // Calculate special price if discount is applied
        if (productDTO.getDiscount() > 0) {
            double specialPrice = productDTO.getPrice() - (productDTO.getPrice() * productDTO.getDiscount() / 100);
            productDTO.setSpecialPrice(specialPrice);
        } else {
            productDTO.setSpecialPrice(productDTO.getPrice());
        }

        // Set default values
        if (productDTO.getQuantity() == null) productDTO.setQuantity(1);
        if (productDTO.getInStock() == null) productDTO.setInStock(true);
        if (productDTO.getSellerName() == null) productDTO.setSellerName("admin");
        if (productDTO.getImageUrl() == null) productDTO.setImageUrl("shoe-cleaner-placeholder.png");

        ShoeCleanerProduct product = modelMapper.map(productDTO, ShoeCleanerProduct.class);
        product.setShoeCleanerCategory(category);

        ShoeCleanerProduct savedProduct = productRepository.save(product);
        ShoeCleanerProductDTO response = convertToDTO(savedProduct);
        response.setCategoryName(category.getCategoryName());

        return response;
    }

    @Override
    public ShoeCleanerProductDTO updateProduct(Long productId, ShoeCleanerProductDTO productDTO) {
        ShoeCleanerProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerProduct", "productId", productId));

        // Update category if changed
        if (productDTO.getCategoryId() != null && !productDTO.getCategoryId().equals(product.getShoeCleanerCategory().getCategoryId())) {
            ShoeCleanerCategory category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerCategory", "categoryId", productDTO.getCategoryId()));
            product.setShoeCleanerCategory(category);
        }

        // Update product fields
        if (productDTO.getProductName() != null) product.setProductName(productDTO.getProductName());
        if (productDTO.getBrand() != null) product.setBrand(productDTO.getBrand());
        if (productDTO.getPrice() != null) product.setPrice(productDTO.getPrice());
        if (productDTO.getDiscount() != null) product.setDiscount(productDTO.getDiscount());
        if (productDTO.getDescription() != null) product.setDescription(productDTO.getDescription());
        if (productDTO.getImageUrl() != null) product.setImageUrl(productDTO.getImageUrl());
        if (productDTO.getQuantity() != null) product.setQuantity(productDTO.getQuantity());
        if (productDTO.getInStock() != null) product.setInStock(productDTO.getInStock());

        // Recalculate special price if price or discount changed
        if (productDTO.getPrice() != null || productDTO.getDiscount() != null) {
            double specialPrice = product.getPrice() - (product.getPrice() * product.getDiscount() / 100);
            product.setSpecialPrice(specialPrice);
        }

        ShoeCleanerProduct updatedProduct = productRepository.save(product);
        ShoeCleanerProductDTO response = convertToDTO(updatedProduct);
        response.setCategoryName(product.getShoeCleanerCategory().getCategoryName());

        return response;
    }

    @Override
    public ShoeCleanerProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        ShoeCleanerProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerProduct", "productId", productId));

        Map uploadResult = cloudinaryImageService.upload(image);
        String imageUrl = (String) uploadResult.get("secure_url");

        product.setImageUrl(imageUrl);

        ShoeCleanerProduct updatedProduct = productRepository.save(product);
        ShoeCleanerProductDTO response = convertToDTO(updatedProduct);
        response.setCategoryName(product.getShoeCleanerCategory().getCategoryName());

        return response;
    }

    @Override
    public ShoeCleanerProductDTO getProductById(Long productId) {
        ShoeCleanerProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerProduct", "productId", productId));

        ShoeCleanerProductDTO response = convertToDTO(product);
        response.setCategoryName(product.getShoeCleanerCategory().getCategoryName());

        return response;
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<ShoeCleanerProduct> productPage = productRepository.findAll(pageable);

        return getProductResponse(productPage);
    }

    @Override
    public ProductResponse getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerCategory", "categoryId", categoryId));

        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<ShoeCleanerProduct> productPage = productRepository.findByShoeCleanerCategory_CategoryId(categoryId, pageable);

        return getProductResponse(productPage);
    }

    @Override
    public ProductResponse getProductsByCategoryName(String categoryName, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<ShoeCleanerProduct> productPage = productRepository.findByShoeCleanerCategory_CategoryName(categoryName, pageable);

        return getProductResponse(productPage);
    }

    @Override
    public ProductResponse getProductsByBrand(String brand, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<ShoeCleanerProduct> productPage = productRepository.findByBrand(brand, pageable);

        return getProductResponse(productPage);
    }

    @Override
    public ProductResponse getDiscountedProducts(Integer minDiscount, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<ShoeCleanerProduct> productPage = productRepository.findByDiscountGreaterThanEqual(minDiscount, pageable);

        return getProductResponse(productPage);
    }

    @Override
    public ProductResponse adminGetAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Page<ShoeCleanerProduct> page = productRepository.findAll(pageDetails);

        return getProductResponse(page);
    }

    @Override
    public ShoeCleanerProductDTO adminUpdateProductImage(Long productId, MultipartFile image) throws IOException {
        return updateProductImage(productId, image);
    }

    @Override
    public void deleteProduct(Long productId) {
        ShoeCleanerProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerProduct", "productId", productId));

        productRepository.delete(product);
    }
    private ShoeCleanerProductDTO convertToDTO(ShoeCleanerProduct product) {
        if (product == null) {
            return null;
        }

        ShoeCleanerProductDTO dto = modelMapper.map(product, ShoeCleanerProductDTO.class);
        dto.setImageUrl(constructImageUrl(product.getImageUrl()));

        if (product.getShoeCleanerCategory() != null) {
            dto.setCategoryId(product.getShoeCleanerCategory().getCategoryId());
            dto.setCategoryName(product.getShoeCleanerCategory().getCategoryName());
        }

        return dto;
    }

    private ProductResponse getProductResponse(Page<ShoeCleanerProduct> productPage) {

        List<ProductDTO> products = productPage.getContent().stream()
                .map(product -> {
                    ShoeCleanerProductDTO dto = convertToDTO(product);
                    if (product.getShoeCleanerCategory() != null) {
                        dto.setCategoryName(product.getShoeCleanerCategory().getCategoryName());
                        dto.setCategoryId(product.getShoeCleanerCategory().getCategoryId());
                    }

                    ProductDTO productDTO = new ProductDTO();
                    productDTO.setProductId(dto.getProductId());
                    productDTO.setProductName(dto.getProductName());
                    productDTO.setBrand(dto.getBrand());
                    productDTO.setPrice(dto.getPrice());
                    productDTO.setDiscount(dto.getDiscount());
                    productDTO.setSpecialPrice(dto.getSpecialPrice());
                    productDTO.setDescription(dto.getDescription());
                    productDTO.setImage(dto.getImageUrl());
                    productDTO.setQuantity(dto.getQuantity());
                    productDTO.setInStock(dto.getInStock());
                    productDTO.setCategoryName(dto.getCategoryName());
                    return productDTO;
                })
                .collect(Collectors.toList());

        // Create and populate response object
        ProductResponse response = new ProductResponse();
        response.setContent(products);
        response.setPageNumber(productPage.getNumber());
        response.setPageSize(productPage.getSize());
        response.setTotalElements(productPage.getTotalElements());
        response.setTotalPages(productPage.getTotalPages());
        response.setLastPage(productPage.isLast());

        return response;
    }

    private String constructImageUrl(String imageUrl) {
        if (imageUrl == null) {
            return null;
        }
        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }
        return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageUrl : imageBaseUrl + "/" + imageUrl;
    }
}
