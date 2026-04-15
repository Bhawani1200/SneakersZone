package Backend.chaubisedhakaBackend.payload;

import Backend.chaubisedhakaBackend.model.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminProductDTO {

    private Long productId;

    @NotBlank(message = "Product name is required")
    @Size(min = 3, max = 100, message = "Product name must be between 3 and 100 characters")
    private String productName;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    private String image;
    private List<String> images;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private double price;

    @Min(value = 0, message = "Discount cannot be negative")
    @Max(value = 100, message = "Discount cannot exceed 100")
    private double discount;

    private Gender gender;
    private Integer size;
    private List<String> sizes;
    private String color;
    private List<String> colors;
    private Boolean inStock;
    private String brand;

    @NotBlank(message = "Category name is required")
    private String categoryName;

    private Long sellerId;
    private String sellerName;
}