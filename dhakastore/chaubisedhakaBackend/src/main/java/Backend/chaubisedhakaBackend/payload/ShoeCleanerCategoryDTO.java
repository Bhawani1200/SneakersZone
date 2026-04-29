package Backend.chaubisedhakaBackend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoeCleanerCategoryDTO {
    private Long categoryId;
    private String categoryName;
    private String description;
    private String imageUrl;
    private Boolean active;
}
