"use client";
import ProductCard from "../ProductCard/page";
import { useState } from "react";
import Cart from "../ShoppingCart/page";

interface ProductProps {
  _id?: string;
  name: string;
  price: number;
  rating: number;
  image?: string;
  addToCart?: (product: ProductProps) => void;
  category: string;
}

export default function ProductList({ products }: any) {
  const [cart, setCart] = useState<ProductProps[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: ProductProps) => {
    setCart((prevCart) => [...prevCart, product]);
    setCartOpen(true);
  };

  const removeFromCart = (productId?: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((product: ProductProps, index: number) => {
          return (
            <div key={product._id} className="w-1/3 p-2">
              {/* Making sure only 5 items per row */}
              <ProductCard
                {...product}
                image={product.image}
                addToCart={addToCart}
              />
            </div>
          );
        })}
      </div>
      <Cart
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </>
  );
}
