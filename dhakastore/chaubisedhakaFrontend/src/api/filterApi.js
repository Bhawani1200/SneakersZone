import api from "./api";


export const fetchFilterOptions = async () => {
  try {
    const [sizes, colors, brands, categories] = await Promise.all([
      api.get("/user/public/filters/sizes"),
      api.get("/user/public/filters/colors"),
      api.get("/user/public/filters/brands"),
      api.get("/user/public/filters/categories")
    ]);
    
    return {
      sizes: sizes.data,
      colors: colors.data,
      brands: brands.data,
      categories: categories.data
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return {
      sizes: [],
      colors: [],
      brands: [],
      categories: []
    };
  }
};