// src/context/CartContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/lib/products";

type CartItem = { id: string; name: string; price: number; qty: number; image?: string };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("cart_v1");
    if (raw) setCart(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map((p) => (p.id === product.id ? { ...p, qty: Math.min(p.qty + qty, 999) } : p));
      return [...prev, { id: product.id, name: product.name, price: product.price, qty, image: product.image }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((p) => p.id !== id));
  const updateQty = (id: string, qty: number) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  const clearCart = () => setCart([]);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
