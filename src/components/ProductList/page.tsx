"use client";
import ProductCard from "../ProductCard/page";
import { useState } from "react";
import Cart from "../ShoppingCart/page";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Shows 10 products (5 per row × 2 rows)

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="space-y-6">
        {/* Product Grid - Maintains your 5 items per row layout */}
        <div className="flex flex-wrap justify-center">
          {currentProducts.map((product: ProductProps) => (
            <div key={product._id} className="w-1/2 p-2 ">
              <ProductCard
                {...product}
                image={product.image}
                addToCart={addToCart}
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) paginate(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }
              />
            </PaginationItem>

            {/* Show page numbers (with ellipsis for many pages) */}
            {totalPages <= 5 ? (
              Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <PaginationItem key={number}>
                    <Button
                      variant={currentPage === number ? "default" : "ghost"}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Button>
                  </PaginationItem>
                )
              )
            ) : (
              <>
                {currentPage > 2 && (
                  <PaginationItem>
                    <Button variant="ghost" onClick={() => paginate(1)}>
                      1
                    </Button>
                  </PaginationItem>
                )}
                {currentPage > 3 && <PaginationItem>...</PaginationItem>}
                {[currentPage - 1, currentPage, currentPage + 1].map((number) =>
                  number > 0 && number <= totalPages ? (
                    <PaginationItem key={number}>
                      <Button
                        variant={currentPage === number ? "default" : "ghost"}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Button>
                    </PaginationItem>
                  ) : null
                )}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>...</PaginationItem>
                )}
                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      onClick={() => paginate(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </PaginationItem>
                )}
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) paginate(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
