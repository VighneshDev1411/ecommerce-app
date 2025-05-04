"use client";
import React, { useState } from "react";
import CategoryTabs from "../components/tabs/page";
import Image from "next/image";
import Cart from "../components/ShoppingCart/page";
import ProductAuthenticity from "../components/SectionProductAutheticity/page";
import CategoriesSection from "../components/CategoriesSection/page";
import pa from "../../public/assets/images/pa.png";
import { useCart } from "../context/CartContext";
import { FloatingButton } from "@/components/ui/floating-button";
import ChatbotAI from "./chatbot/page";

export default function Home() {
  const { cartOpen, setCartOpen } = useCart();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Power Your <span className="text-[#222222]">Performance</span>
                <br />
                Fuel Your <span className="text-[#222222]">Goals</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                Discover premium supplements tailored to your fitness journey.
                Quality products, proven results.
              </p>
              <button className="bg-[#222222] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#333333] transition-colors">
                Shop Now
              </button>
            </div>
            <div className="w-full md:w-1/2 relative">
              <Image
                src="/assets/images/hero_image.jpeg"
                alt="Hero"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <CategoryTabs />
        </div>
      </section>

      {/* Product Authenticity Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-screen-xl mx-auto">
            <Image
              src={pa}
              alt="authenticity_tag"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Cart */}
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={[]}
        removeFromCart={(id: number) => {
          console.log("Remove from cart:", id);
        }}
      />

      {/* Floating Button and ChatbotAI */}
      <FloatingButton onClick={() => setIsChatbotOpen(true)} />
      {isChatbotOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsChatbotOpen(false)}>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <ChatbotAI onClose={() => setIsChatbotOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}

// import React from 'react';

// const CategoriesSection: React.FC = () => {

// };

// export default CategoriesSection;
