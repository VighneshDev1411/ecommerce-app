"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (!sessionId) {
      router.push("/");
      return;
    }

    // Clear the cart after successful payment
    clearCart();
    setMessage("Payment successful! Your order has been placed.");
  }, [router, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#222222] text-white py-2.5 rounded-lg hover:bg-[#333333] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
} 