// src/lib/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Elegant Straight Suit",
    price: 79.99,
    image: "/products/product_1.png",
    category: "Suits",
    description: "Classic straight-cut suit with delicate embroidery — perfect for formal occasions.",
  },
  {
    id: 2,
    name: "Embroidered Palazzo Suit",
    price: 99.99,
    image: "/products/plazoimage.jpg",
    category: "Palazzo Suits",
    description: "Flowy palazzo bottom with matching embroidered top — comfy & stylish.",
  },
  {
    id: 3,
    name: "Silk Palazzo Set",
    price: 69.99,
    image: "/products/product_2.jpeg",
    category: "Palazzo Suits",
    description: "Lightweight silk palazzo set in seasonal colours.",
  },
  {
    id: 4,
    name: "Festive Sharara",
    price: 119.99,
    image: "/products/product_3.jpeg",
    category: "Sharara",
    description: "Traditional sharara with rich details — great for functions and weddings.",
  },
  {
    id: 5,
    name: "Bridal Lehenga (Light)",
    price: 249.99,
    image: "/products/product_4.png",
    category: "Lehenga",
    description: "Elegant lehenga set with handcrafted embellishments.",
  },
];

export default products;
