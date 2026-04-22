package Backend.chaubisedhakaBackend.payload;

import Backend.chaubisedhakaBackend.model.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
//    private Long productId;
//    private String productName;
//    private String description;
//    private Integer quantity;
//    private String image;
//    private double price;
//    private double specialPrice;
//    private double discount;
//    private Gender gender;
//    private Integer size;
//    private String color;
//    private Boolean inStock;
//    private String categoryName;

    private Long productId;
    private String productName;
    private String description;
    private Integer quantity;
    private String image;
    private double price;
    private double specialPrice;
    private double discount;
    private Gender gender;
    private Integer size;
    private String color;
    private List<String> sections;
    private Boolean inStock;
    private String categoryName;
    private List<String> images;
    private List<String> sizes;
    private List<String> colors;
    private String brand;
    private String sellerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
