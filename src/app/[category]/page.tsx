"use client";

import { ProductFilters } from "../../components/FilterSection/page";
import ProductList from "../../components/ProductList/page";
import { useState, useEffect } from "react";

interface ProductProps {
  _id?: string;
  name: string;
  price: number;
  rating: number;
  discount: number;
  image: string;
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/products/${params.category}`);
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, [params.category]);

  function formatCategoryName(category: string): string {
    return category
      .split("-") // Split the category name by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter, ensure the rest are lowercase
      .join(" "); // Join the words with spaces
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex">
      <div className="w-3/10 h-screen flex justify-center items-center p-4">
        <div className="w-full mt-16 max-w-xs">
          <ProductFilters />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-7/10 ml-8 mt-4 mb-6">
        <div className="w-7/10 mt-2 mb-8 ml-2">
          <h1 className="text-2xl font-bold">
            {formatCategoryName(params.category)}
          </h1>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
