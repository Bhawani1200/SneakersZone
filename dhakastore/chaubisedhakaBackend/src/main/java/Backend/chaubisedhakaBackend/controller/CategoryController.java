package Backend.chaubisedhakaBackend.controller;

import Backend.chaubisedhakaBackend.config.AppConstants;
import Backend.chaubisedhakaBackend.payload.CategoryDTO;
import Backend.chaubisedhakaBackend.payload.CategoryResponse;
import Backend.chaubisedhakaBackend.payload.ShoeCleanerCategoryDTO;
import Backend.chaubisedhakaBackend.service.CategoryService;
import Backend.chaubisedhakaBackend.service.ShoeCleanerCategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ShoeCleanerCategoryService shoeCleanerCategoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_CATEGORIES_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        CategoryResponse categoryResponse = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
    }

    @GetMapping("/public/categories/shoe-cleaner")
    public ResponseEntity<List<CategoryDTO>> getShoeCleanerCategories() {
        List<CategoryDTO> categories = categoryService.getShoeCleanerCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/public/categories/regular")
    public ResponseEntity<List<CategoryDTO>> getRegularCategories() {
        List<CategoryDTO> categories = categoryService.getRegularCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // Admin endpoints - require admin role
    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategoryDTO = categoryService.createCategory(categoryDTO);
        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> deleteCategory(@PathVariable Long categoryId) {
        CategoryDTO deletedObject = categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(deletedObject, HttpStatus.OK);
    }

    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@Valid @RequestBody CategoryDTO categoryDTO,
                                                      @PathVariable Long categoryId) {
        CategoryDTO savedCategoryDTO = categoryService.updateCategory(categoryDTO, categoryId);
        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.OK);
    }

    @PostMapping("/admin/shoe-cleaner/categories")
    public ResponseEntity<ShoeCleanerCategoryDTO> createShoeCleanerCategory(@Valid @RequestBody ShoeCleanerCategoryDTO categoryDTO) {
        ShoeCleanerCategoryDTO createdCategory = shoeCleanerCategoryService.createCategory(categoryDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/admin/shoe-cleaner/categories/{categoryId}")
    public ResponseEntity<ShoeCleanerCategoryDTO> getShoeCleanerCategoryById(@PathVariable Long categoryId) {
        ShoeCleanerCategoryDTO category = shoeCleanerCategoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping("/admin/shoe-cleaner/categories/{categoryId}")
    public ResponseEntity<ShoeCleanerCategoryDTO> updateShoeCleanerCategory(
            @Valid @RequestBody ShoeCleanerCategoryDTO categoryDTO,
            @PathVariable Long categoryId) {
        ShoeCleanerCategoryDTO updatedCategory = shoeCleanerCategoryService.updateCategory(categoryDTO, categoryId);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/admin/shoe-cleaner/categories/{categoryId}")
    public ResponseEntity<String> deleteShoeCleanerCategory(@PathVariable Long categoryId) {
        shoeCleanerCategoryService.deleteCategory(categoryId);
        return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/admin/shoe-cleaner/categories")
    public ResponseEntity<List<ShoeCleanerCategoryDTO>> getAllShoeCleanerCategories() {
        List<ShoeCleanerCategoryDTO> categories = shoeCleanerCategoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
