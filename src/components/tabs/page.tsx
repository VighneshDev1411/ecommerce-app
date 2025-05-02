"use client";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/page";
import Cart from "../ShoppingCart/page";
import { useCart } from "@/src/context/CartContext";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("best_sellers");
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const { cartOpen, setCartOpen, cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${activeTab}`);
        const data = await res.json();
        const mappedProducts = data.map((product: any) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
        }));
        setProducts(mappedProducts);
        setVisibleCount(6);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          className={`px-6 py-2 font-semibold border-b-2 transition-all duration-200 ${
            activeTab === "best_sellers"
              ? "border-[#222222] text-[#222222]"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("best_sellers")}
        >
          BEST SELLERS
        </button>
        <button
          className={`px-6 py-2 font-semibold border-b-2 transition-all duration-200 ${
            activeTab === "new_arrivals"
              ? "border-[#222222] text-[#222222]"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => setActiveTab("new_arrivals")}
        >
          NEW ARRIVALS
        </button>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#222222]"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {products.slice(0, visibleCount).map((product) => (
                <div key={product.id} className="w-[280px]">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {products.length > 6 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() =>
                    setVisibleCount(visibleCount === 6 ? products.length : 6)
                  }
                  className="text-[#222222] font-semibold hover:underline transition-all duration-200 flex items-center space-x-2"
                >
                  <span>{visibleCount === 6 ? "Show More" : "Show Less"}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      visibleCount === 6 ? "rotate-0" : "rotate-180"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
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
