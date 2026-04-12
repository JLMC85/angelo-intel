import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  trending: boolean;
}

const TRENDING_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Outdoor Telescopic Folding Chair",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    rating: 4.8,
    category: "Outdoor",
    trending: true,
  },
  {
    id: "2",
    name: "Insulated Picnic Tote Bag",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.6,
    category: "Outdoor",
    trending: true,
  },
  {
    id: "3",
    name: "Portable LED Camping Lantern",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop",
    rating: 4.7,
    category: "Outdoor",
    trending: true,
  },
  {
    id: "4",
    name: "Portable Blender & Juice Cup",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    rating: 4.5,
    category: "Health",
    trending: true,
  },
  {
    id: "5",
    name: "Niacinamide Whitening Toothpaste",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop",
    rating: 4.4,
    category: "Beauty",
    trending: true,
  },
  {
    id: "6",
    name: "Mushroom Coffee Packets (20 Pack)",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=500&fit=crop",
    rating: 4.6,
    category: "Health",
    trending: true,
  },
  {
    id: "7",
    name: "Under Cabinet LED Kitchen Lights",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1565182999561-e1dfc686d4d4?w=500&h=500&fit=crop",
    rating: 4.9,
    category: "Home",
    trending: true,
  },
  {
    id: "8",
    name: "Reusable 2-in-1 Facial Cleansing Cloth",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    rating: 4.3,
    category: "Beauty",
    trending: false,
  },
  {
    id: "9",
    name: "Polarized Cycling Sunglasses",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    rating: 4.7,
    category: "Fashion",
    trending: true,
  },
  {
    id: "10",
    name: "Stainless Steel Pendant Necklace",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    rating: 4.5,
    category: "Fashion",
    trending: false,
  },
  {
    id: "11",
    name: "Pet GPS Tracking Collar",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1587300411107-ec26345fe75e?w=500&h=500&fit=crop",
    rating: 4.8,
    category: "Pet",
    trending: true,
  },
  {
    id: "12",
    name: "Pet Cooling Mat & Water Fountain",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1587300411107-ec26345fe75e?w=500&h=500&fit=crop",
    rating: 4.6,
    category: "Pet",
    trending: true,
  },
];

export default function Dropshipping() {
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"trending" | "price" | "rating">("trending");

  const categories = Array.from(new Set(TRENDING_PRODUCTS.map(p => p.category)));

  let filteredProducts = TRENDING_PRODUCTS;
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (sortBy === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else {
    filteredProducts.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-slate-900">Dropshipping</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      {/* Header */}
      <section className="container py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Trending Products
        </h1>
        <p className="text-lg text-slate-600">
          Discover the hottest items trending right now. All products ship directly to your door.
        </p>
      </section>

      {/* Filters */}
      <section className="container mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Filter */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === null
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-900 hover:bg-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
            >
              <option value="trending">Trending</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-indigo-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.trending && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Trending
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 transition">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">{product.rating}</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                </div>

                {/* CTA */}
                <Button
                  size="sm"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      image: product.image,
                    });
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
