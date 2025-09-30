import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Aarika Aura</h3>
          <p className="text-gray-400">
            Your one-stop shop for premium products. Quality guaranteed with fast delivery.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-indigo-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-indigo-500 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-indigo-500">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-indigo-500">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-indigo-500">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-indigo-500">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
