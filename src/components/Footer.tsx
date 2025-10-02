import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-light tracking-wider text-white mb-3">AARIKA AURA</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mb-4"></div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Elevating everyday style with premium fashion collections. 
              Where elegance meets contemporary design for the modern individual.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://www.instagram.com/aarikaaura/" 
                target="_blank" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              <Link 
                href="https://www.tiktok.com/@aarikaaura" 
                target="_blank" 
                className="p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
              >
                <SiTiktok className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg tracking-wide">NAVIGATION</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop All" },
                { href: "/new-arrivals", label: "New Arrivals" },
                { href: "/collections", label: "Collections" },
                { href: "/sale", label: "Sale" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:pl-2 transform hover:translate-x-1 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg tracking-wide">SUPPORT</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/shipping", label: "Shipping Info" },
                { href: "/returns", label: "Returns & Exchanges" },
                { href: "/size-guide", label: "Size Guide" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:pl-2 transform hover:translate-x-1 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg tracking-wide">CONTACT</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">aarikaaura@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (437) 993-3006</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Brampton, Canada</span>
              </div>
            </div>

            {/* Newsletter Signup 
            <div className="mt-8">
              <h5 className="text-white font-medium mb-3 text-sm">STAY UPDATED</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-r-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm font-medium">
                  Join
                </button>
              </div>
            </div>*/}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Aarika Aura. Crafted with elegance.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"></div>
    </footer>
  );
}