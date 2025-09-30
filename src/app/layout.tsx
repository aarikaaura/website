import "./globals.css";
import { CartProvider } from "@/context/CartContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CartProvider>
          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
