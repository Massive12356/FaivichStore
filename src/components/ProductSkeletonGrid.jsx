import React from "react";
import ProductSkeletonCard from "../components/ProductSkeletonCard";

const ProductSkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="w-full col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeletonCard key={index} index={index} />
      ))}
    </div>
  );
};

export default ProductSkeletonGrid;
