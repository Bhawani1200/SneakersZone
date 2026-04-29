package Backend.chaubisedhakaBackend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeCleanerProductDTO {
    private Long productId;
    private String productName;
    private String brand;
    private Double price;
    private Double discount;
    private Double specialPrice;
    private String description;
    private String imageUrl;
    private Integer quantity;
    private Boolean inStock;
    private String sellerName;
    private Long categoryId;
    private String categoryName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
