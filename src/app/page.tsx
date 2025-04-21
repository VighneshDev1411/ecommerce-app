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
import ProductAuthenticity from "../components/SectionProductAutheticity/page";

import {
  RiHeartPulseFill,
  RiSeedlingFill,
  RiFireFill,
  RiScales3Fill,
  RiCapsuleFill,
  RiMoonFill,
  RiWomenFill,
  RiMentalHealthFill,
  RiArrowRightLine,
} from "react-icons/ri";
import CategoriesSection from "../components/CategoriesSection/page";
import pa from "../../public/assets/images/pa.png";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { cartOpen, setCartOpen } = useCart();
  return (
    <div className="flex flex-col">
      <CategoryTabs />
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={[]}
        removeFromCart={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="ml-36 mr-36 w-8xl">
        {" "}
        {/* Add w-full to parent */}
        <Image className="w-full" src={pa} alt="authenticty_tag" />
      </div>
      <div>
        <CategoriesSection />
      </div>

      {/* Best Sellers Section */}
    </div>
  );
}

// import React from 'react';

// const CategoriesSection: React.FC = () => {

// };

// export default CategoriesSection;
