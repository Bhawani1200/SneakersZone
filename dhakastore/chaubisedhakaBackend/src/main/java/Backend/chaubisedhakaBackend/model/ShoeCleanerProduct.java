package Backend.chaubisedhakaBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "shoe_cleaner_products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeCleanerProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @NotBlank
    private String productName;

    private String brand;

    private Double price;

    private Double discount = 0.0;

    private Double specialPrice;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private Integer quantity = 1;

    private Boolean inStock = true;

    private String sellerName = "admin";

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private ShoeCleanerCategory shoeCleanerCategory;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (specialPrice == null && price != null) {
            specialPrice = price;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
