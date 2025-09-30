import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import products from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
<div className="flex flex-col min-h-screen">
    <main className="flex-grow">

<Header />

      {/* 🔥 Hero Image Slider */}
      <HeroSlider />


      {/* 🛍 Featured Products Section */}
      <section id="products" className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Featured Collection</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
</main>
<Footer />
    
</div>
  );
}
