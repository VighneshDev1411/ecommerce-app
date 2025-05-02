"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

export default function SuccessPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (!sessionId) {
      router.push("/");
      return;
    }

    const createOrder = async () => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart,
            total: cart.reduce(
              (total, item) => total + item.price * (item.quantity || 1),
              0
            ),
            paymentMethod: "card",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create order");
        }

        // Clear the cart after successful order creation
        clearCart();
        setMessage("Payment successful! Your order has been placed.");
      } catch (error) {
        console.error("Error creating order:", error);
        setError("Failed to create order. Please contact support.");
      }
    };

    createOrder();
  }, [router, cart, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
        {error ? (
          <p className="text-red-600 mb-8">{error}</p>
        ) : (
          <p className="text-gray-600 mb-8">{message}</p>
        )}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-[#222222] text-white py-2.5 rounded-lg hover:bg-[#333333] transition-colors"
          >
            View Orders
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-white text-[#222222] py-2.5 rounded-lg border border-[#222222] hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
