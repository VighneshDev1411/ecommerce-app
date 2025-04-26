"use client"; // Enable client-side functionality

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, X } from "lucide-react";

interface WishlistProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Wishlist = ({ open, setOpen }: WishlistProps) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (!open) return null;

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-50">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Wishlist</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-4">
        {wishlist.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Your wishlist is empty</p>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 rounded-md border border-gray-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600">₹{item.price}</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <ShoppingCart size={12} /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {wishlist.length > 0 && (
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={clearWishlist}
            className="w-full text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear Wishlist
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist; 