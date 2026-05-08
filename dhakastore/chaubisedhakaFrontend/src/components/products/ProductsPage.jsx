import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/user/public/search?keyword=${encodeURIComponent(searchQuery)}&page=0&size=50`,
      );
      setProducts(response.data.content);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{searchQuery}"
      </h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500">No products found</p>
          <p className="text-sm text-zinc-400 mt-2">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};
