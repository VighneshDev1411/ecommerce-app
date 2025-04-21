"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  rating,
  image,
  category,
}) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (!id) return;
    addToCart({
      id: String(id),
      name,
      price,
      rating, // <-- important!
      image: image || "",
      category,
    });
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Center the Image */}
      <div className="flex justify-center p-4">
        <Image
          className="h-48 w-48 rounded-t-lg"
          src={image.replace("/public", "")}
          alt={name}
          width={192}
          height={192}
        />
      </div>

      <div className="px-4 pb-4">
        <h5 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
          {name}
        </h5>

        {/* Rating Section */}
        <div className="flex items-center mt-1 mb-3">
          <div className="flex items-center space-x-1">
            {Array(Math.floor(rating))
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-2">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{price}
          </span>
          <button
            className="text-white bg-[#222222] hover:bg-[#333333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
