package Backend.chaubisedhakaBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "shoe_cleaner_categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeCleanerCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @NotBlank
    @Size(min = 2, message = "Category name must be at least 2 characters")
    @Column(unique = true)
    private String categoryName;

    private String description;

    private String imageUrl;

    private Boolean active = true;

    @OneToMany(mappedBy = "shoeCleanerCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShoeCleanerProduct> products = new ArrayList<>();
}