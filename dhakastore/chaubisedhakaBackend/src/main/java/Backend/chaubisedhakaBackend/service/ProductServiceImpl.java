package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.model.*;
import Backend.chaubisedhakaBackend.payload.AdminProductDTO;
import Backend.chaubisedhakaBackend.payload.CartDTO;
import Backend.chaubisedhakaBackend.repositories.*;
import Backend.chaubisedhakaBackend.exceptions.APIException;
import Backend.chaubisedhakaBackend.exceptions.ResourceNotFoundException;
import Backend.chaubisedhakaBackend.payload.ProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductResponse;
import Backend.chaubisedhakaBackend.util.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Transactional
@Service
public class ProductServiceImpl implements ProductService{


    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CloudinaryImageService cloudinaryImageService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    @Autowired
    AuthUtil authUtil;


    @Override
    public ProductDTO addProduct(ProductDTO productDTO, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        boolean isProductNotPresent = true;

        List<Product> products = category.getProducts();
        for (Product value : products) {
            if (value.getProductName().equals(productDTO.getProductName())) {
                isProductNotPresent = false;
                break;
            }
        }
        if (isProductNotPresent) {
            Product product = modelMapper.map(productDTO, Product.class);
            product.setCategory(category);
            product.setUser(authUtil.loggedInUser());
            product.setImage("product.png");
            double specialPrice = product.getPrice() -
                    ((product.getDiscount() * 0.01) * product.getPrice());
            product.setSpecialPrice(specialPrice);
            Product savedProduct = productRepository.save(product);
            return modelMapper.map(savedProduct, ProductDTO.class);
        }else{
            throw new APIException("Product already exists");
        }
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category, String gender, Integer size, String color, Double minPrice, Double maxPrice, Integer minDiscount, Boolean inStock) {
        Sort sortByAndOrder = sortOrder.equals("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Specification<Product> spec = Specification.where(null);

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("productName"), "%" + keyword.toLowerCase() + "%"));
        }

        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("category").get("categoryName")), category));
        }

        // ✅ gender filter added
        if (gender != null && !gender.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("gender"), Gender.valueOf(gender.toUpperCase())));
        }

        if (size != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("size"), size));
        }

        if (color != null && !color.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("color")), color.toLowerCase()));
        }

        // Price range filter
        spec = spec.and((root, query, cb) ->
                cb.between(root.get("specialPrice"), minPrice, maxPrice));

        // Discount filter — frontend sends "30", "40" etc.
        if (minDiscount != null && minDiscount > 0) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("discount"), (double) minDiscount));
        }

        if (inStock != null && inStock) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThan(root.get("quantity"), 0));
        }

        Page<Product> pageProducts = productRepository.findAll(spec, pageDetails);

        List<Product> products = pageProducts.getContent();
        List<ProductDTO> productDTOS = products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        productResponse.setContent(productDTOS);
        return productResponse;
    }

    @Override
    public ProductResponse searchCategoryById(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category","categoryId",categoryId));
        Sort sortByAndOrder=sortOrder.equals("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();
        Pageable pageDetails= PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Product> pageProducts=productRepository.findByCategoryOrderByPriceAsc(category,pageDetails);
        List<Product> products=pageProducts.getContent();

        if(products.isEmpty()){
            throw new APIException(category.getCategoryName()+"Category does not have any product");
        }
        List<ProductDTO>productDTOS=products.stream()
                .map(product->modelMapper.map(product,ProductDTO.class))
                .toList();
        ProductResponse productResponse=new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(productResponse.isLastPage());
        return productResponse;
    }

    @Override
    public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder=sortOrder.equals("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageDetails= PageRequest.of(pageNumber,pageSize,sortByAndOrder);

        Page<Product> pageProducts=productRepository.findByProductNameLikeIgnoreCase('%' + keyword + '%',pageDetails);
        List<Product>products=pageProducts.getContent();
        List<ProductDTO>productDTOS=products.stream()
                .map(product-> {
                    ProductDTO productDTO=modelMapper.map(product, ProductDTO.class);
                    productDTO.setImage(constructImageUrl(product.getImage()));
                    return productDTO;
                })

                .toList();

        if(products.size()==0){
            throw new APIException("Products not found with the keyword"+keyword);
        }
        ProductResponse productResponse=new ProductResponse();
        productResponse.setContent(productDTOS);
        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product productFromDB=productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));
        Product product=modelMapper.map(productDTO,Product.class);
        productFromDB.setProductName(product.getProductName());
        productFromDB.setDescription(product.getDescription());
        productFromDB.setQuantity(product.getQuantity());
        productFromDB.setPrice(product.getPrice());
        productFromDB.setDiscount(product.getDiscount());
        productFromDB.setSpecialPrice(product.getSpecialPrice());
        productFromDB.setGender(product.getGender());

        Product savedProduct=productRepository.save(productFromDB);

        List<Cart> carts = cartRepository.findCartsByProductId(productId);

        List<CartDTO> cartDTOs = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

            List<ProductDTO> products = cart.getCartItems().stream()
                    .map(p -> modelMapper.map(p.getProduct(), ProductDTO.class)).collect(Collectors.toList());

            cartDTO.setProducts(products);

            return cartDTO;

        }).toList();

        cartDTOs.forEach(cart->cartService.updateProductInCarts(cart.getCartId(),productId));

        return modelMapper.map(savedProduct,ProductDTO.class);
    }

    private String constructImageUrl(String imageName){
        if (imageName != null && imageName.startsWith("http")) {
            return imageName;
        }
//        return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageName : imageBaseUrl + "/" + imageName;

        return imageBaseUrl.endsWith("/")
                ? imageBaseUrl + imageName
                : imageBaseUrl + "/" + imageName;
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        // Step 1 — Remove from carts
        List<Cart> carts = cartRepository.findCartsByProductId(productId);
        carts.forEach(cart -> cartService.deleteProductFromCart(cart.getCartId(), productId));

        // Step 2 — Find orders that contain this product
        List<Order> affectedOrders = orderItemRepository.findOrdersByProductId(productId);

        // Step 3 — Delete order_items referencing this product
        orderItemRepository.deleteByProductId(productId);

        // Step 4 — Delete orders that now have no items
        affectedOrders.forEach(order -> {
            if (order.getOrderItems().isEmpty()) {
                orderRepository.delete(order);
            }
        });

        // Step 5 — Safe to delete product now
        productRepository.delete(product);

        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {

        Product productFromDb=productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));

        Map uploadResult = cloudinaryImageService.upload(image);

        String imageUrl = (String) uploadResult.get("secure_url");

        productFromDb.setImage(imageUrl);

//        String fileName=fileService.uploadImage(path,image);
//        productFromDb.setImage(fileName);

        Product updatedProduct=productRepository.save(productFromDb);
        return modelMapper.map(updatedProduct,ProductDTO.class);
    }

    @Override
    public ProductResponse getAllProductsForAdmin(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepository.findAll(pageDetails);

        List<Product> products = pageProducts.getContent();

        List<ProductDTO> productDTOS = products.stream()
                .map(product -> {
                    ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                    productDTO.setImage(constructImageUrl(product.getImage()));
                    return productDTO;
                })
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @Override
    public ProductResponse getAllProductsForSeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        User user = authUtil.loggedInUser();
        Page<Product> pageProducts = productRepository.findByUser(user, pageDetails);

        List<Product> products = pageProducts.getContent();

        List<ProductDTO> productDTOS = products.stream()
                .map(product -> {
                    ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                    productDTO.setImage(constructImageUrl(product.getImage()));
                    return productDTO;
                })
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public ProductResponse getProductsByGender(String gender, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Gender genderEnum = Gender.valueOf(gender.toUpperCase());
        Page<Product> products = productRepository.findByGender(genderEnum, pageable);

        List<ProductDTO> productDTOs = products.getContent().stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(products.getNumber());
        productResponse.setPageSize(products.getSize());
        productResponse.setTotalElements(products.getTotalElements());
        productResponse.setTotalPages(products.getTotalPages());
        productResponse.setLastPage(products.isLast());
        return productResponse;

    }

    @Override
    public ProductDTO adminCreateProduct(AdminProductDTO adminProductDTO) {
        if (productRepository.existsByProductName(adminProductDTO.getProductName())) {
            throw new APIException("Product with name '" + adminProductDTO.getProductName() + "' already exists!");
        }

        // Find category by name
        Category category = categoryRepository.findByCategoryName(adminProductDTO.getCategoryName());
        if (category == null) {
            throw new ResourceNotFoundException("Category", "categoryName", adminProductDTO.getCategoryName());
        }

        // Create new product
        Product product = new Product();
        product.setProductName(adminProductDTO.getProductName());
        product.setDescription(adminProductDTO.getDescription());
        product.setQuantity(adminProductDTO.getQuantity());
        product.setImage(adminProductDTO.getImage());
        product.setImages(adminProductDTO.getImages() != null ? adminProductDTO.getImages() : new ArrayList<>());
        product.setPrice(adminProductDTO.getPrice());
        product.setDiscount(adminProductDTO.getDiscount());
        product.setGender(adminProductDTO.getGender() != null ? adminProductDTO.getGender() : Gender.UNISEX);
        product.setSize(adminProductDTO.getSize());
        product.setSizes(adminProductDTO.getSizes() != null ? adminProductDTO.getSizes() : new ArrayList<>());
        product.setColor(adminProductDTO.getColor());
        product.setColors(adminProductDTO.getColors() != null ? adminProductDTO.getColors() : new ArrayList<>());
        product.setInStock(adminProductDTO.getInStock() != null ? adminProductDTO.getInStock() : adminProductDTO.getQuantity() > 0);
        product.setBrand(adminProductDTO.getBrand());
        product.setCategory(category);

        // Set seller if provided
        if (adminProductDTO.getSellerId() != null) {
            User seller = userRepository.findById(adminProductDTO.getSellerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Seller", "sellerId", adminProductDTO.getSellerId()));
            product.setUser(seller);
        }

        // Calculate special price
        product.calculateSpecialPrice();

        Product savedProduct = productRepository.save(product);
        return convertToProductDTO(savedProduct);

    }

    @Override
    public ProductDTO adminUpdateProduct(Long productId, AdminProductDTO adminProductDTO) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        // Update category if changed
        if (adminProductDTO.getCategoryName() != null && !adminProductDTO.getCategoryName().equals(existingProduct.getCategory().getCategoryName())) {
            Category category = categoryRepository.findByCategoryName(adminProductDTO.getCategoryName());
            if (category == null) {
                throw new ResourceNotFoundException("Category", "categoryName", adminProductDTO.getCategoryName());
            }
            existingProduct.setCategory(category);
        }

        // Update product details
        if (adminProductDTO.getProductName() != null) {
            existingProduct.setProductName(adminProductDTO.getProductName());
        }
        if (adminProductDTO.getDescription() != null) {
            existingProduct.setDescription(adminProductDTO.getDescription());
        }
        if (adminProductDTO.getQuantity() != null) {
            existingProduct.setQuantity(adminProductDTO.getQuantity());
            existingProduct.setInStock(adminProductDTO.getQuantity() > 0);
        }
        if (adminProductDTO.getImage() != null) {
            existingProduct.setImage(adminProductDTO.getImage());
        }
        if (adminProductDTO.getImages() != null) {
            existingProduct.setImages(adminProductDTO.getImages());
        }
        if (adminProductDTO.getPrice() > 0) {
            existingProduct.setPrice(adminProductDTO.getPrice());
        }
        if (adminProductDTO.getDiscount() >= 0) {
            existingProduct.setDiscount(adminProductDTO.getDiscount());
        }
        if (adminProductDTO.getGender() != null) {
            existingProduct.setGender(adminProductDTO.getGender());
        }
        if (adminProductDTO.getSize() != null) {
            existingProduct.setSize(adminProductDTO.getSize());
        }
        if (adminProductDTO.getSizes() != null) {
            existingProduct.setSizes(adminProductDTO.getSizes());
        }
        if (adminProductDTO.getColor() != null) {
            existingProduct.setColor(adminProductDTO.getColor());
        }
        if (adminProductDTO.getColors() != null) {
            existingProduct.setColors(adminProductDTO.getColors());
        }
        if (adminProductDTO.getInStock() != null) {
            existingProduct.setInStock(adminProductDTO.getInStock());
        }
        if (adminProductDTO.getBrand() != null) {
            existingProduct.setBrand(adminProductDTO.getBrand());
        }

        // Update seller if provided
        if (adminProductDTO.getSellerId() != null) {
            User seller = userRepository.findById(adminProductDTO.getSellerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Seller", "sellerId", adminProductDTO.getSellerId()));
            existingProduct.setUser(seller);
        }

        // Recalculate special price
        existingProduct.calculateSpecialPrice();

        Product updatedProduct = productRepository.save(existingProduct);
        return convertToProductDTO(updatedProduct);
    }

    @Override
    public ProductDTO adminDeleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        productRepository.delete(product);
        return convertToProductDTO(product);
    }

    @Override
    public ProductResponse adminGetAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Page<Product> page = productRepository.findAll(pageDetails);
        List<ProductDTO> productDTOs = page.getContent().stream()
                .map(this::convertToProductDTO)
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setTotalElements(page.getTotalElements());
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setLastPage(page.isLast());

        return productResponse;
    }



    @Override
    public ProductDTO adminUpdateProductImage(Long productId, MultipartFile image) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        String imagePath = fileService.uploadImage(image);
        product.setImage(imagePath);

        Product updatedProduct = productRepository.save(product);
        return convertToProductDTO(updatedProduct);
    }

    @Override
    public ProductResponse adminGetProductsByCategory(String categoryName, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Category category = categoryRepository.findByCategoryName(categoryName);
        if (category == null) {
            throw new ResourceNotFoundException("Category", "categoryName", categoryName);
        }

        Page<Product> page = productRepository.findByCategoryOrderByPriceAsc(category, pageDetails);
        List<ProductDTO> productDTOs = page.getContent().stream()
                .map(this::convertToProductDTO)
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setTotalElements(page.getTotalElements());
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setLastPage(page.isLast());

        return productResponse;
    }

    @Override
    public ProductResponse adminGetProductsByBrand(String brand, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Page<Product> page = productRepository.findByBrand(brand, pageDetails);
        List<ProductDTO> productDTOs = page.getContent().stream()
                .map(this::convertToProductDTO)
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setTotalElements(page.getTotalElements());
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setLastPage(page.isLast());

        return productResponse;

    }

    @Override
    public ProductResponse adminGetDiscountedProducts(Integer minDiscount, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

        Page<Product> page = productRepository.findProductsByMinDiscount(minDiscount, pageDetails);
        List<ProductDTO> productDTOs = page.getContent().stream()
                .map(this::convertToProductDTO)
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOs);
        productResponse.setPageNumber(page.getNumber());
        productResponse.setPageSize(page.getSize());
        productResponse.setTotalElements(page.getTotalElements());
        productResponse.setTotalPages(page.getTotalPages());
        productResponse.setLastPage(page.isLast());

        return productResponse;
    }

    @Override
    public ProductDTO getSingleProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        return convertToProductDTO(product);
    }

    private ProductDTO convertToProductDTO(Product product) {
        if (product == null) {
            return null;
        }

        ProductDTO dto = new ProductDTO();

        // Set basic fields
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setQuantity(product.getQuantity());
        dto.setImage(product.getImage());
        dto.setPrice(product.getPrice());
        dto.setSpecialPrice(product.getSpecialPrice());
        dto.setDiscount(product.getDiscount());
        dto.setGender(product.getGender());
        dto.setSize(product.getSize());
        dto.setColor(product.getColor());
        dto.setInStock(product.getInStock());

        // Set category name
        if (product.getCategory() != null) {
            dto.setCategoryName(product.getCategory().getCategoryName());
        }

        // Set seller name
        if (product.getUser() != null) {
            dto.setSellerName(product.getUser().getUserName());
        }

        // Set collections
        dto.setImages(product.getImages() != null ? product.getImages() : new ArrayList<>());
        dto.setSizes(product.getSizes() != null ? product.getSizes() : new ArrayList<>());
        dto.setColors(product.getColors() != null ? product.getColors() : new ArrayList<>());
        dto.setBrand(product.getBrand());

        // Set timestamps
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());

        return dto;
    }
}
