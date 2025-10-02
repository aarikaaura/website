"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-2 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-gray-600">
          <span>Free shipping on orders over $100</span>
          <div className="flex gap-4">
            <Link href="/account" className="hover:text-gray-900 transition">Account</Link>
            <Link href="/support" className="hover:text-gray-900 transition">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-8xl mx-auto p-5 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12">
              <Image
                src="/image/logo.png"
                alt="Aarika Aura Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-light text-gray-900 leading-tight tracking-tight">Aarika Aura</span>
              <span className="text-xs text-gray-500 tracking-wider">PREMIUM FASHION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/products" className="nav-link">Shop</Link>
            <Link href="/new-arrivals" className="nav-link">New Arrivals</Link>
            <Link href="/collections" className="nav-link">Collections</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            <Link href="/account" className="text-gray-600 hover:text-gray-900 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsWishlistOpen(!isWishlistOpen);
                  setIsCartOpen(false);
                }} 
                className="relative text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>

              {/* Wishlist Dropdown */}
              <AnimatePresence>
                {isWishlistOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Wishlist ({wishlistCount})</h3>
                        <button 
                          onClick={() => setIsWishlistOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>
                      
                      {wishlist.length === 0 ? (
                        <div className="text-center py-8">
                          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">Your wishlist is empty</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-72 overflow-y-auto">
                          {wishlist.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="rounded object-cover flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Link 
                                  href={`/product/${item.id}`}
                                  className="text-xs text-gray-600 hover:text-gray-900 font-medium px-2 py-1 border border-gray-300 rounded hover:border-gray-400 transition"
                                  onClick={() => setIsWishlistOpen(false)}
                                >
                                  View
                                </Link>
                                <button
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="text-gray-400 hover:text-red-500 transition"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {wishlist.length > 0 && (
                        <Link href="/wishlist">
                          <button 
                            className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium text-sm"
                            onClick={() => setIsWishlistOpen(false)}
                          >
                            View Wishlist
                          </button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsWishlistOpen(false);
                }} 
                className="relative text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Cart Dropdown */}
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 text-lg">Cart ({totalItems})</h3>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          ✕
                        </button>
                      </div>

                      {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">Your cart is empty</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-3 max-h-72 overflow-y-auto">
                            {cartItems.map((item) => (
                              <div
                                key={`${item.id}-${item.selectedSize || "no-size"}`}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                              >
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className="rounded-md object-cover flex-shrink-0"
                                  />
                                )}

                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                                  {item.selectedSize && (
                                    <p className="text-xs text-gray-600 mt-1">Size: {item.selectedSize}</p>
                                  )}
                                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>

                                  <div className="flex items-center gap-2 mt-2">
                                    <button
                                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1, item.selectedSize)}
                                      disabled={item.quantity <= 1}
                                      className="qty-btn"
                                    >
                                      -
                                    </button>
                                    <span className="text-sm w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1, item.selectedSize)}
                                      className="qty-btn"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <button
                                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                                  className="text-gray-400 hover:text-red-500 transition p-1 flex-shrink-0"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="flex justify-between items-center mb-6">
                              <span className="text-sm text-gray-600">Subtotal:</span>
                              <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
                            </div>

                            <div className="space-y-6">
                              <Link href="/cart">
                                <button 
                                  className="w-full bg-white border-2 border-gray-900 text-gray-900 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200 font-medium text-sm mb-2"
                                  onClick={() => setIsCartOpen(false)}
                                >
                                  View Cart
                                </button>
                              </Link>
                              <Link href="/checkout">
                                <button 
                                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
                                  onClick={() => setIsCartOpen(false)}
                                >
                                  Checkout Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="px-6 py-6 space-y-4">
              <Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/products" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="/new-arrivals" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
              <Link href="/collections" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
              <Link href="/about" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
