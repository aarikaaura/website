import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // You can use any icon library

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}

        <Link href="/" className="text-2xl font-bold text-indigo-600">
          Aarika Aura
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <Link href="/shop" className="hover:text-indigo-600 transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">
            Contact
          </Link>
        </nav>

        {/* Cart Icon */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            3
          </span>
        </Link>

        {/* Mobile Menu Button (optional) */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
