// src/app/wishlist/page.tsx
"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, Eye, Share2, Star, ArrowRight, Sparkles } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast, showSuccess, showCart } = useToast();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
    showCart(`${product.name} moved to cart!`);
  };

  const handleShareProduct = (product: any) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: `${window.location.origin}/product/${product.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`);
      showToast("Product link copied to clipboard!", "info");
    }
  };

  const totalValue = wishlist.reduce((total, item) => total + item.price, 0);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Animated Empty State */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Heart className="w-16 h-16 text-pink-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Start building your dream collection by adding items you love
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Explore Collections
            </Link>
            <Link
              href="/new-arrivals"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold text-lg"
            >
              New Arrivals
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Featured Collections */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Love</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Elegant Suits", href: "/collections/suits", color: "from-blue-50 to-cyan-100" },
                { name: "Festive Wear", href: "/collections/festive", color: "from-purple-50 to-pink-100" },
                { name: "Bridal Collection", href: "/collections/bridal", color: "from-rose-50 to-red-100" },
              ].map((collection) => (
                <Link
                  key={collection.name}
                  href={collection.href}
                  className={`bg-gradient-to-r ${collection.color} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">{collection.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">Discover more →</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 text-sm">{wishlist.length} items • ${totalValue.toFixed(2)} total</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
            <Link
              href="/shop"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.isNew && (
                    <span className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                      NEW
                    </span>
                  )}
                  {item.isBestSeller && (
                    <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      BESTSELLER
                    </span>
                  )}
                </div>

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShareProduct(item)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
                    title="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Actions Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${item.id}`}
                    className="w-12 bg-white text-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-lg"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-medium text-gray-600">4.2</span>
                  </div>
                </div>

                {/* Size Options */}
                <div className="flex gap-2 mb-4">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className="w-8 h-8 text-xs border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center font-medium text-gray-700"
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>In Stock • Ready to Ship</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Wishlist Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{wishlist.length}</div>
              <div className="text-sm text-gray-600">Items Saved</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
              <ShoppingBag className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">{wishlist.filter(item => item.isBestSeller).length}</div>
              <div className="text-sm text-gray-600">Bestsellers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => {
                wishlist.forEach(item => addToCart(item));
                clearWishlist();
                showSuccess("All items moved to cart!");
              }}
              className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Move All to Cart
            </button>
            <Link
              href="/shop"
              className="flex-1 border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}