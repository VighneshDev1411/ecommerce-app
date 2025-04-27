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
  id?: string;
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
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Shows 9 products (3 per row × 3 rows)

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
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        {/* Product Grid using Flexbox */}
        <div className="flex flex-wrap justify-center gap-8">
          {currentProducts.map((product: ProductProps) => (
            <div key={product.id} className="w-[280px] mb-4">
              <ProductCard {...product} image={product.image || ""} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center">
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
