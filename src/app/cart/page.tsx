"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { ShoppingBag, Trash2, ArrowRight, Sparkles, Shield, Truck, RotateCcw } from "lucide-react";

export default function CartPage() {
  const { cartItems, clearCart, subtotal, tax, total } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>
          
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Discover our premium collection and add some stylish items to your cart
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Start Shopping
                </button>
              </Link>
              <Link href="/new-arrivals">
                <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold flex items-center gap-2">
                  New Arrivals
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedSize || 'no-size'}`}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  selectedSize={item.selectedSize}
                  color={item.color}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-semibold">
                      {subtotal > 150 ? "FREE" : "$9.99"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {subtotal < 75 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-blue-700 font-medium">
                        Add ${(75 - subtotal).toFixed(2)} for FREE shipping!
                      </span>
                      <span className="text-blue-700 font-medium">
                        {Math.round((subtotal / 75) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mb-4">
                    Proceed to Checkout
                  </button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/shop">
                  <button className="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                    Continue Shopping
                  </button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free delivery on orders over $75</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-4 h-4 text-purple-600" />
                    <span>30-day easy returns</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm">Secure Checkout</h3>
                    <p className="text-blue-700 text-xs mt-1">
                      Your payment information is encrypted and secure. We never share your details with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products (when cart has items) */}
        {cartItems.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Matching Accessories", description: "Complete your look", price: "$29.99", href: "/accessories" },
                { name: "Care Products", description: "Keep your items fresh", price: "$24.99", href: "/care" },
                { name: "Gift Cards", description: "Perfect for any occasion", price: "From $25", href: "/gift-cards" },
              ].map((product, index) => (
                <Link key={index} href={product.href}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <p className="text-lg font-bold text-gray-900">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}