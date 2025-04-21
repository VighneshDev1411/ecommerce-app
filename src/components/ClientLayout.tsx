// components/ClientLayout.tsx
"use client";

import React, { useState } from "react";
import Navbar from "./navbar/page";
import Cart from "./ShoppingCart/page";
import { Footer2 } from "./Footer/page";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]); // You can improve typing later

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex w-full flex-col justify-center gap-8 items-center">
      <div className="w-full">
        <Navbar setCartOpen={setCartOpen} />
      </div>
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
      />
      <main>{children}</main>

      <Footer2 />
    </div>
  );
};

export default ClientLayout;
