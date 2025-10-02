// src/components/ProductCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Star, Heart, ShoppingBag, Zap, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/lib/products";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating 
              ? "fill-amber-400 stroke-amber-400" 
              : "stroke-gray-300 fill-gray-50"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating})</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showSizeError, setShowSizeError] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
console.log('Add to Cart clicked - Selected Size:', selectedSize); // Debug log
    
    if (!selectedSize) {
      setShowSizeError(true);
      showToast("Please select a size before adding to cart", "warning");
      return;
    }

    addToCart(product, selectedSize);
    showToast(`${product.name} (Size: ${selectedSize}) added to cart!`, "cart");
    setShowSizeError(false);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist!`, "wishlist");
    }
  };

  const handleSizeSelect = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    setShowSizeError(false);
  };

  // Available sizes for the product
  const availableSizes = product.sizes || ['S', 'M', 'L', 'XL'];

  return (
    <div className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-full hover:-translate-y-1 w-full">
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <div className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg">
              NEW
            </div>
          )}
          
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg ${
            isWishlisted
              ? "bg-red-500 text-white scale-110"
              : "bg-white/90 text-gray-600 hover:bg-white hover:scale-110 hover:text-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick View */}
        <Link
          href={`/product/${product.id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
        >
          <div className="bg-white text-gray-900 px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            Quick View
          </div>
        </Link>

        {/* Best Seller */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-1.5 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            BESTSELLER
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <StarRating rating={product.rating || 4.2} />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <span>24 sold</span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Size:</span>
            {selectedSize && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Check className="w-3 h-3" />
                <span>Selected: {selectedSize}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-1.5 flex-wrap">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={(e) => handleSizeSelect(size, e)}
                className={`w-7 h-7 text-xs border rounded-lg transition-all duration-200 flex items-center justify-center font-medium ${
                  selectedSize === size
                    ? "border-gray-900 bg-gray-900 text-white scale-110"
                    : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          
          {/* Size Error Message */}
          {showSizeError && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
              ⚠️ Please select a size
            </p>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group/cart ${
                selectedSize
                  ? "bg-gray-900 text-white hover:bg-gray-600 hover:scale-105"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={!selectedSize}
            >
              <ShoppingBag className="w-3.5 h-3.5 group-hover/cart:scale-110 transition-transform" />
              {selectedSize ? `Add to Cart` : 'Select Size'}
            </button>

            <Link
              href={`/product/${product.id}`}
              className="flex items-center justify-center w-12 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}