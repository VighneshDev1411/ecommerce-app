import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/page";
import Cart from "../ShoppingCart/page";
import { useCart } from "@/context/CartContext";

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
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const { cartOpen, setCartOpen, cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${activeTab}`);
        const data = await res.json();
        // Make sure we map MongoDB's _id to id
        const mappedProducts = data.map((product: any) => ({
          id: product._id, // map _id to id
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
        }));
        setProducts(mappedProducts);
        setVisibleCount(5); // reset visible count on tab switch
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

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
      {!loading && products.length > 5 && (
        <div className="flex mr-4 mb-6 justify-end px-6 mt-2">
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
            {products
              .slice(0, visibleCount)
              .reduce((rows: ProductProps[][], product, i) => {
                const rowIndex = Math.floor(i / 5);
                if (!rows[rowIndex]) rows[rowIndex] = [];
                rows[rowIndex].push(product);
                return rows;
              }, [])
              .map((row, i) => (
                <div key={`row-${i}`} className="flex gap-4">
                  {row.map((product) => (
                    <ProductCard
                      key={product.id}
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
