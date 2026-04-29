package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.payload.ShoeCleanerCategoryDTO;
import java.util.List;

public interface ShoeCleanerCategoryService {
    ShoeCleanerCategoryDTO createCategory(ShoeCleanerCategoryDTO categoryDTO);

    ShoeCleanerCategoryDTO updateCategory(ShoeCleanerCategoryDTO categoryDTO, Long categoryId);

    ShoeCleanerCategoryDTO getCategoryById(Long categoryId);

    List<ShoeCleanerCategoryDTO> getAllCategories();

    List<ShoeCleanerCategoryDTO> getActiveCategories();

    void deleteCategory(Long categoryId);
}
