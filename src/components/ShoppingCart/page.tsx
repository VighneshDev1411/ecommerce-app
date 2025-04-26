"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, X } from "lucide-react";

export default function Cart() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();
  const { addToWishlist } = useWishlist();

  const handleMoveToWishlist = (product: any) => {
    addToWishlist(product);
    removeFromCart(product.id);
  };

  if (!cartOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-50">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 rounded-md border border-gray-200 overflow-hidden">
                  <img
                    src={product.image.replace("/public", "")}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-600">₹{product.price}</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleMoveToWishlist(product)}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Heart size={12} /> Save for later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-100">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal</span>
            <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-[#222222] text-white py-2.5 rounded-lg hover:bg-[#333333] transition-colors">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
