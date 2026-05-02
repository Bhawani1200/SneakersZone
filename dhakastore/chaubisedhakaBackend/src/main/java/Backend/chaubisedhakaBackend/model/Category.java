package Backend.chaubisedhakaBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name= "categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long categoryId;

    @NotBlank
    @Size(min = 4,message = "Characters must be greater than 4")
    private String categoryName;

//    @Column(name = "category_type", nullable = false)
//    private String categoryType = "REGULAR";

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private List<Product> products;
}
