// components/ClientLayout.tsx
"use client";

import React, { useState } from "react";
import Navbar from "./navbar/page";
import Cart from "./ShoppingCart/page";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]); // You can improve typing later

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar setCartOpen={setCartOpen} />
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
      />
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
