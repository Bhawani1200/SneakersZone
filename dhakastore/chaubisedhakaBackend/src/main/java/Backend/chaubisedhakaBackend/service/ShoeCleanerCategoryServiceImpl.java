package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.exceptions.APIException;
import Backend.chaubisedhakaBackend.exceptions.ResourceNotFoundException;
import Backend.chaubisedhakaBackend.model.ShoeCleanerCategory;
import Backend.chaubisedhakaBackend.model.ShoeCleanerProduct;
import Backend.chaubisedhakaBackend.payload.ShoeCleanerCategoryDTO;
import Backend.chaubisedhakaBackend.repositories.ProductRepository;
import Backend.chaubisedhakaBackend.repositories.ShoeCleanerCategoryRepository;
import Backend.chaubisedhakaBackend.repositories.ShoeCleanerProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShoeCleanerCategoryServiceImpl implements  ShoeCleanerCategoryService{

    @Autowired
    private ShoeCleanerCategoryRepository categoryRepository;

    @Autowired
    private ShoeCleanerProductRepository shoeCleanerProductRepository;

   @Autowired
    private ProductRepository  productRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public ShoeCleanerCategoryDTO createCategory(ShoeCleanerCategoryDTO categoryDTO) {
        // Check if category already exists
        if (categoryRepository.findByCategoryNameIgnoreCase(categoryDTO.getCategoryName()).isPresent()) {
            throw new APIException("Category with name '" + categoryDTO.getCategoryName() + "' already exists!");
        }

        ShoeCleanerCategory category = modelMapper.map(categoryDTO, ShoeCleanerCategory.class);
        category.setActive(true);
        ShoeCleanerCategory savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory, ShoeCleanerCategoryDTO.class);
    }

    @Override
    public ShoeCleanerCategoryDTO updateCategory(ShoeCleanerCategoryDTO categoryDTO, Long categoryId) {
        ShoeCleanerCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerCategory", "categoryId", categoryId));

        // Check if new name conflicts with existing category
        if (!category.getCategoryName().equalsIgnoreCase(categoryDTO.getCategoryName()) &&
                categoryRepository.findByCategoryNameIgnoreCase(categoryDTO.getCategoryName()).isPresent()) {
            throw new APIException("Category with name '" + categoryDTO.getCategoryName() + "' already exists!");
        }

        category.setCategoryName(categoryDTO.getCategoryName());
        category.setDescription(categoryDTO.getDescription());
        category.setImageUrl(categoryDTO.getImageUrl());
        category.setActive(categoryDTO.getActive());

        ShoeCleanerCategory updatedCategory = categoryRepository.save(category);
        return modelMapper.map(updatedCategory, ShoeCleanerCategoryDTO.class);

    }

    @Override
    public ShoeCleanerCategoryDTO getCategoryById(Long categoryId) {
        ShoeCleanerCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerCategory", "categoryId", categoryId));
        return modelMapper.map(category, ShoeCleanerCategoryDTO.class);
    }

    @Override
    public List<ShoeCleanerCategoryDTO> getAllCategories() {
        List<ShoeCleanerCategory> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, ShoeCleanerCategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ShoeCleanerCategoryDTO> getActiveCategories() {
        List<ShoeCleanerCategory> categories = categoryRepository.findByActiveTrue();
        return categories.stream()
                .map(category -> modelMapper.map(category, ShoeCleanerCategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long categoryId) {
        ShoeCleanerCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("ShoeCleanerCategory", "categoryId", categoryId));


        // Before categoryRepository.delete(category)
        if (category.getProducts() != null && !category.getProducts().isEmpty()) {
            for (ShoeCleanerProduct product : category.getProducts()) {
                product.setShoeCleanerCategory(null);
                shoeCleanerProductRepository.save(product);
            }
        }

        categoryRepository.delete(category);
    }
}
