"use client";

import { ProductFilters } from "../../components/FilterSection/page";
import ProductList from "../../components/ProductList/page";
import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";

interface ProductProps {
  id: string;
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-[#222222] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          {isFilterOpen ? <X size={24} /> : <Filter size={24} />}
        </button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`${
          isFilterOpen ? "fixed inset-0 z-40 bg-white" : "hidden"
        } lg:relative lg:block lg:w-80 lg:min-h-screen lg:border-r border-gray-200 bg-white`}
      >
        <div className="sticky top-0 p-4">
          <div className="flex justify-between items-center lg:hidden mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <ProductFilters />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {formatCategoryName(params.category)}
            </h1>
            <p className="text-gray-600 mt-2">
              {products.length} products available
            </p>
          </div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
