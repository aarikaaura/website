"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/lib/products";

// Update the CartItem interface to include size
interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string, onAdded?: () => void) => void;
  removeFromCart: (id: number, size?: string) => void; // Add size parameter
  updateCartItemQuantity: (id: number, quantity: number, size?: string) => void; // Add size parameter
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Updated addToCart to accept size parameter
  const addToCart = (product: Product, size?: string, onAdded?: () => void) => {
    setCartItems((prev) => {
      // Check if product with same ID AND same size already exists
      const exist = prev.find((p) => 
        p.id === product.id && p.selectedSize === size
      );
      
      if (exist) {
        if (onAdded) onAdded();
        return prev.map((p) =>
          p.id === product.id && p.selectedSize === size 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        );
      }
      
      if (onAdded) onAdded();
      // Add new item with selected size
      return [...prev, { 
        ...product, 
        quantity: 1,
        selectedSize: size 
      }];
    });
  };

  const removeFromCart = (id: number, size?: string) => {
    setCartItems((prev) => 
      prev.filter((item) => !(item.id === id && item.selectedSize === size))
    );
  };

  const updateCartItemQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  // Totals calculation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxRate = 0.13;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};