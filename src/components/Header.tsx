"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">Aarika Aura</Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link href="/shop" className="hover:text-indigo-600 transition">Shop</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </nav>

        {/* Cart Icon */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="relative focus:outline-none">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems} // triggers animation on change
                initial={{ scale: 1 }}
                animate={{ scale: [1.3, 1] }}
                transition={{ duration: 0.3 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Mini Cart Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg z-50 p-4"
              >
                <h3 className="font-semibold text-gray-800 mb-2">Cart Items</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your cart is empty</p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-50 rounded p-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="rounded object-cover"
                            />
                          )}
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-600 hover:underline text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href="/cart">
                  <button className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg shadow hover:bg-indigo-700 transition">
                    View Cart / Checkout
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">☰</button>
        </div>
      </div>
    </header>
  );
}
