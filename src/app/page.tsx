import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import products from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
const featured = products.slice(0, 6);
  return (
<div className="flex flex-col min-h-screen">
    <main className="flex-grow">


  <Header />


      {/* 🔥 Hero Image Slider */}
      <div className="max-w-8xl mx-auto p-5">
  <HeroSlider />
</div>


      {/* 🛍 Featured Products Section */}
      <section id="products" className="max-w-8xl mx-auto p-5">
        <h2 className="text-2xl font-semibold mb-4">Featured Collection</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
{/* View All Products Button */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md
                       transition duration-300 hover:bg-gray-900 active:scale-95"
          >
            View All Products
          </Link>
        </div>
      </section>
</main>
<Footer />
    
</div>
  );
}




      
