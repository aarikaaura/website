import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import products from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: { id: string };
}

// 🔀 Simple shuffle function
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id, 10);
  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) {
    return notFound();
  }

  // 🎯 Shuffle & get 3 random related products
  const relatedProducts = shuffleArray(
    products.filter((p) => p.id !== productId)
  ).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">
      {/* 🔙 Back Link */}
      <Link
        href="/"
        className="text-gray-600 hover:text-indigo-600 underline mb-6 inline-block"
      >
        ← Back to Shop
      </Link>

      {/* 🛍 Product Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">
        {/* 📸 Product Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={600}
            className="object-contain rounded-lg"
          />
        </div>

        {/* 📋 Product Details */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* ⭐️ Extra Details */}
            <ul className="space-y-2 mb-6 text-gray-700">
              <li>✔ Available in multiple sizes</li>
              <li>✔ Premium fabric quality</li>
              <li>✔ Free delivery over $50</li>
              <li>✔ Easy 7-day returns</li>
            </ul>

            <p className="text-2xl font-semibold text-indigo-600 mb-6">
              ${product.price}
            </p>
          </div>

          {/* 🛒 Add to Cart */}
          <button className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md transition duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🎯 Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">You may also like</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
