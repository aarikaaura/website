"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/shop">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Go to Shop
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {/* Clear Cart Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              ))}
            </div>

            <div className="bg-gray-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p className="mb-2">Items: {cartItems.length}</p>
              <p className="text-lg font-bold mb-4">Total: ${totalPrice.toFixed(2)}</p>
              <Link href="/checkout">
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
