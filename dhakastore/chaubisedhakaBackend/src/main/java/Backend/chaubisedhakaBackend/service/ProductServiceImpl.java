package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.model.*;
import Backend.chaubisedhakaBackend.payload.CartDTO;
import Backend.chaubisedhakaBackend.repositories.*;
import Backend.chaubisedhakaBackend.exceptions.APIException;
import Backend.chaubisedhakaBackend.exceptions.ResourceNotFoundException;
import Backend.chaubisedhakaBackend.payload.ProductDTO;
import Backend.chaubisedhakaBackend.payload.ProductResponse;
import Backend.chaubisedhakaBackend.util.AuthUtil;
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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

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
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category, String gender) {
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
        productResponse.setLastPage(pageProducts.isLast()); // ✅ fixed bug: was productResponse.isLastPage()
        productResponse.setContent(productDTOS);
        return productResponse;
    }


//    @Override
//    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category) {
//
//        Sort sortByAndOrder=sortOrder.equals("asc")
//                ?Sort.by(sortBy).ascending()
//                :Sort.by(sortBy).descending();
//        Pageable pageDetails= PageRequest.of(pageNumber,pageSize,sortByAndOrder);
//        Specification <Product>spec=Specification.where(null);
//        if(keyword != null && !keyword.isEmpty()){
//            spec=spec.and(((root, query, criteriaBuilder) ->
//                    criteriaBuilder.like(root.get("productName"),"%" + keyword.toLowerCase() + "%")));
//        }
//
//        if(category != null && !category.isEmpty()){
//            spec=spec.and(((root, query, criteriaBuilder) ->
//                    criteriaBuilder.like(criteriaBuilder.lower(root.get("category").get("categoryName")),category)));
//        }
//
//
//
//        Page<Product> pageProducts=productRepository.findAll(spec,pageDetails);
//
//        List<Product> products=pageProducts.getContent();
//        List<ProductDTO>productDTOS=products.stream()
//                .map(product->modelMapper.map(product,ProductDTO.class))
//                .toList();
//
//        ProductResponse productResponse=new ProductResponse();
//        productResponse.setPageNumber(pageProducts.getNumber());
//        productResponse.setPageSize(pageProducts.getSize());
//        productResponse.setTotalElements(pageProducts.getTotalElements());
//        productResponse.setTotalPages(pageProducts.getTotalPages());
//        productResponse.setLastPage(productResponse.isLastPage());
//        productResponse.setContent(productDTOS);
//        return productResponse;
//    }

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
//        Product product=productRepository.findById(productId)
//                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));
//
//        List<Cart>carts=cartRepository.findCartsByProductId(productId);
//
//        carts.forEach(cart->cartService.deleteProductFromCart(cart.getCartId(),productId));
//
//        productRepository.delete(product);
//
//        return modelMapper.map(product,ProductDTO.class);

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

}
