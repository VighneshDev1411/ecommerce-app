"use client"; // Enable client-side functionality

import React from "react";
import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

// Props interface for the Wishlist component
interface WishlistProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Wishlist component
const Wishlist = ({ open, setOpen }: WishlistProps) => {
  // Get wishlist and cart functions from context
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // If wishlist is not open, don't render anything
  if (!open) return null;

  // Function to move item to cart
  const handleMoveToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    // Wishlist overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      {/* Wishlist panel */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Wishlist</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Wishlist items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-180px)]">
          {wishlist.length === 0 ? (
            <p className="text-center text-gray-500">Your wishlist is empty</p>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                {/* Product image */}
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Product details */}
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-blue-600 font-semibold">₹{item.price}</p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Move to Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Remove from Wishlist"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <button
              onClick={clearWishlist}
              className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 