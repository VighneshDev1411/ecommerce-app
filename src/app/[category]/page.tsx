// app/[category]/page.tsx

import clientPromise from "../../lib/mongodb";
import { notFound } from "next/navigation";
import { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard/page";

import { fetchProducts } from "../../lib/fetchProducts";
import ProductList from "../../components/ProductList/page";

interface ProductProps {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await fetchProducts(params.category);

  console.log("Products", products);

  function formatCategoryName(category: string): string {
    return category
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join with spaces
  }

  return (
    <div className="flex">
      {/* Left Column - 30% width */}
      <div className="w-3/10 bg-red-500 h-screen">{/* Empty content */}</div>

      {/* Right Column - 70% width */}
      <div className="w-7/10 ml-8 mt-4 mb-6">
        <h1 className="text-2xl font-bold">
          {formatCategoryName(params.category)}
        </h1>
        <ProductList products={products} />
      </div>
    </div>
  );
}
