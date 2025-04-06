"use client";
import React from "react";
import { useState } from "react";
import Navbar from "../components/navbar/page";
import CategoryTabs from "../components/tabs/page";
import ImgWhey from "../assets/images/img_wheyprotein.jpeg";

import Image from "next/image";
import ProductCard from "../components/ProductCard/page";
import products from "../utils/products.json";
import Example from "../components/ShoppingCart/page";
import Cart from "../components/ShoppingCart/page";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div>
      <Navbar setCartOpen={setCartOpen} />
      <CategoryTabs />
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={[]}
        removeFromCart={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
      />

      {/* Best Sellers Section */}
    </div>
  );
}
