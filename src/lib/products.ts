// src/lib/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  originalPrice?: number;
  rating?: number;
  sizes?: string[]; // Available sizes
  quantity?: number; // For cart functionality
};

const products: Product[] = [
  {
    id: "1",
    name: "Elegant Straight Suit",
    price: 79.99,
    originalPrice: 129.99,  // Original price (must be higher than price)
    image: "/products/product_1.png",
    category: "suits",
    description:
      "Classic straight-cut suit with delicate embroidery — perfect for formal occasions.",
    sizes: ["S", "M", "L", "XL"], // ✅ Added sizes
  },
  {
    id: "2",
    name: "Embroidered Palazzo Suit",
    price: 99.99,
    originalPrice: 129.99,
    image: "/products/plazoimage.jpg",
    category: "plazzo",
    description:
      "Flowy palazzo bottom with matching embroidered top — comfy & stylish.",
    sizes: ["M", "L", "XL"], // ✅ Added sizes
  },
  {
    id: "3",
    name: "Silk Palazzo Set",
    price: 69.99,
    originalPrice: 129.99,
    image: "/products/product_2.jpeg",
    category: "plazzo",
    description: "Lightweight silk palazzo set in seasonal colours.",
    sizes: ["S", "M", "L"], // ✅ Added sizes
  },
  {
    id: "4",
    name: "Festive Sharara",
    price: 119.99,
    originalPrice: 149.99,
    image: "/products/product_3.jpeg",
    category: "sharara",
    description:
      "Traditional sharara with rich details — great for functions and weddings.",
    sizes: ["M", "L", "XL"], // ✅ Added sizes
  },
  {
    id: "5",
    name: "Bridal Lehenga (Light)",
    price: 249.99,
    originalPrice: 329.99,
    image: "/products/product_4.png",
    category: "lehenga",
    description:
      "Elegant lehenga set with handcrafted embellishments.",
    sizes: ["S", "M", "L", "XL"], // ✅ Added sizes
  },
];

export default products;
