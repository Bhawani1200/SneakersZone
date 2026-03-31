package Backend.chaubisedhakaBackend.payload;

import Backend.chaubisedhakaBackend.model.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long productId;
    private String productName;
    private String description;
    private Integer quantity;
    private String image;
    private double price;
    private double specialPrice;
    private double discount;
    private Gender gender;

}
