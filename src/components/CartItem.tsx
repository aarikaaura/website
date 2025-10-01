"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartItem({ id, name, price, image, quantity }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow">
      {/* Product info */}
      <div className="flex items-center gap-4">
        <Image src={image} alt={name} width={80} height={80} className="object-cover rounded" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p>${price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity & Remove */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => updateQuantity(id, Number(e.target.value))}
          className="w-16 border rounded p-1 text-center"
        />
        <button
          onClick={() => removeFromCart(id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
