import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/page";
import Cart from "../ShoppingCart/page";

interface ProductProps {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("best_sellers");
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(5); // ← for Show More logic
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${activeTab}`);
        const data = await res.json();
        setProducts(data);
        setVisibleCount(5); // reset visible count on tab switch
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  const addToCart = (product: ProductProps) => {
    setCart((prevCart) => [...prevCart, product]);
    setCartOpen(true);
  };

  const removeFromCart = (productId?: number | string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId && item.id !== productId)
    );
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center space-x-4 bg-white py-4">
        <button
          className={`px-6 py-2 font-semibold border-b-4 ${
            activeTab === "best_sellers"
              ? "border-[#222222] text-[#222222]"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("best_sellers")}
        >
          BEST SELLERS
        </button>
        <button
          className={`px-6 py-2 font-semibold border-b-4 ${
            activeTab === "new_arrivals"
              ? "border-[#222222] text-[#222222]"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("new_arrivals")}
        >
          NEW ARRIVALS
        </button>
      </div>

      {/* Product Cards */}
      {/* Show More Button */}
      {/* Show More Text Link */}
      {/* Show More / Show Less Link at Top Right */}
      {!loading && products.length > 5 && (
        <div className="flex mr-24 mb-6 justify-end px-6 mt-2">
          <span
            className="text-sm text-[#222222] font-semibold cursor-pointer hover:underline"
            onClick={() =>
              visibleCount >= products.length
                ? setVisibleCount(5)
                : setVisibleCount((prev) => prev + 5)
            }
          >
            {visibleCount >= products.length ? "Show Less" : "Show More"}
          </span>
        </div>
      )}

      <div className="container mx-auto px-6 pb-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="flex flex-col space-y-6">
            {Array.from({ length: Math.ceil(visibleCount / 5) }).map((_, i) => (
              <div key={i} className="flex gap-4">
                {products.slice(i * 5, i * 5 + 5).map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    {...product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart */}
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default CategoryTabs;
