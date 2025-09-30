// src/components/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";


export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden bg-white flex flex-col shadow-sm hover:shadow-md transition">
      {/* Product Image */}
      <div className="w-full aspect-[3/4] relative overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-1">{product.description}</p>

        {/* Price + Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="font-semibold">${product.price.toFixed(2)}</div>

          <div className="flex gap-2">
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded
                         transition duration-300 hover:scale-105 hover:bg-indigo-700
                         active:scale-95 shadow-md hover:shadow-lg cursor-pointer
                         hover:ring-2 hover:ring-indigo-400 hover:ring-offset-2"
            >
              Add to Cart
            </button>

            {/* View Button with Eye on Hover */}

            <Link
              href={`/product/${product.id}`}
              className="group relative flex items-center justify-center w-24 px-3 py-2 border border-gray-400 text-gray-700 rounded
                         transition duration-300 hover:scale-105 hover:bg-gray-200
                         active:scale-95 shadow-sm hover:shadow-md cursor-pointer
                         hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 overflow-hidden"
            >
              {/* Default text */}
              <span className="transition-opacity duration-300 group-hover:opacity-0">
                View
              </span>

              {/* Eye icon (shows on hover) */}
              <Eye className="absolute w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
