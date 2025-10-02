"use client";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Image from "next/image";
import { Minus, Plus, Trash2, Heart, Share2, AlertCircle } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  color?: string;
}

export default function CartItem({ id, name, price, image, quantity, selectedSize, color }: CartItemProps) {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleQuantityIncrease = () => {
    updateCartItemQuantity(id, quantity + 1, selectedSize); // Pass selectedSize
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      updateCartItemQuantity(id, quantity - 1, selectedSize); // Pass selectedSize
    }
  };

  const handleSaveForLater = () => {
    const product = { 
      id, 
      name, 
      price, 
      image, 
      selectedSize, 
      color,
      description: "",
      category: "",
      sizes: selectedSize ? [selectedSize] : []
    };
    addToWishlist(product);
    removeFromCart(id, selectedSize);
    showToast("Item moved to wishlist!", "wishlist");
  };

  const handleRemove = () => {
    removeFromCart(id, selectedSize);
    showToast("Item removed from cart");
  };

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this product: ${name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "info");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-md transition-shadow">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Quantity Badge 
            {quantity > 1 && (
              <div className="absolute -top-2 -left-2 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                {quantity}
              </div>
            )}*/}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                {name}
              </h3>
              
              {/* Size and Color */}
              <div className="flex flex-wrap gap-4 mb-3">
                {selectedSize ? (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                    <span className="text-sm text-gray-600 font-medium">Size:</span>
                    <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 min-w-[40px] text-center">
                      {selectedSize}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-1.5 border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-700 font-medium">Size not selected</span>
                  </div>
                )}
                
                {color && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                    <span className="text-sm text-gray-600 font-medium">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-bold text-gray-900 capitalize">
                        {color.toLowerCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-2 bg-green-50 rounded-lg px-3 py-1.5 w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Eligible for FREE delivery
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 rounded-lg px-3 py-1.5 w-fit">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                In stock • <span className="font-semibold">Ships in 1-2 days</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${price.toFixed(2)}
              </div>
              {quantity > 1 && (
                <div className="text-sm text-gray-600 space-y-1">
                  <div>${(price * quantity).toFixed(2)} total</div>
                  <div className="text-xs text-gray-500">
                    ${price.toFixed(2)} × {quantity}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section - Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
            {/* Quantity Controls */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm">
                <button
                  onClick={handleQuantityDecrease}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-l-xl border-r border-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 text-lg font-bold min-w-[70px] text-center bg-gray-50">
                  {quantity}
                </span>
                <button
                  onClick={handleQuantityIncrease}
                  className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl border-l border-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Save for Later */}
              <button 
                onClick={handleSaveForLater}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Save for later</span>
              </button>

              {/* Delete */}
              <button
                onClick={handleRemove}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors p-3 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}