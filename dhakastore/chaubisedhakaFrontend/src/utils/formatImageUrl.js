/**
 * Formats a product image URL.
 * Handles full URLs (starting with http/https) and relative paths.
 * 
 * @param {string} image - The image path or URL
 * @returns {string} - The formatted image URL
 */
export const formatImageUrl = (image) => {
  if (!image) return "/placeholder-product.png";
  
  if (image.startsWith("http")) {
    return image;
  }
  
  let baseUrl = import.meta.env.VITE_BACK_END_URL || "http://localhost:8080";
  if (baseUrl.endsWith("/api")) {
    baseUrl = baseUrl.slice(0, -4);
  }
  return `${baseUrl}/images/${image}`;
};
