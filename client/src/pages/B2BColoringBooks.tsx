import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function B2BColoringBooks() {
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const [selectedPack, setSelectedPack] = useState<"single" | "10pack" | "50pack">("single");

  const books = [
    {
      id: 1,
      title: "Zen Garden Mandalas",
      pages: 35,
      category: "Mandala Designs",
      image: "🧘",
      single: 7.99,
      pack10: 59.99,
      pack50: 199.99,
    },
    {
      id: 2,
      title: "Nature's Beauty",
      pages: 40,
      category: "Botanical",
      image: "🌿",
      single: 7.99,
      pack10: 59.99,
      pack50: 199.99,
    },
    {
      id: 3,
      title: "Cosmic Dreams",
      pages: 45,
      category: "Abstract",
      image: "✨",
      single: 9.99,
      pack10: 79.99,
      pack50: 249.99,
    },
    {
      id: 4,
      title: "Ocean Waves",
      pages: 38,
      category: "Seascapes",
      image: "🌊",
      single: 7.99,
      pack10: 59.99,
      pack50: 199.99,
    },
    {
      id: 5,
      title: "Forest Escape",
      pages: 42,
      category: "Nature",
      image: "🌲",
      single: 9.99,
      pack10: 79.99,
      pack50: 249.99,
    },
    {
      id: 6,
      title: "Butterfly Paradise",
      pages: 36,
      category: "Animals",
      image: "🦋",
      single: 7.99,
      pack10: 59.99,
      pack50: 199.99,
    },
  ];

  const pricingTiers = [
    {
      id: "single",
      name: "Single",
      quantity: "1 Book",
      description: "Perfect for personal use",
      discount: "0%",
    },
    {
      id: "10pack",
      name: "10-Pack",
      quantity: "10 Books",
      description: "Great for small businesses",
      discount: "25%",
    },
    {
      id: "50pack",
      name: "50-Pack",
      quantity: "50 Books",
      description: "Bulk discount for resellers",
      discount: "50%",
    },
  ];

  const handleAddToCart = (book: typeof books[0]) => {
    const prices = {
      single: book.single,
      "10pack": book.pack10,
      "50pack": book.pack50,
    };
    
    addItem({
      id: `${book.id}-${selectedPack}`,
      name: `${book.title} (${selectedPack === "single" ? "1" : selectedPack === "10pack" ? "10" : "50"}-Pack)`,
      price: prices[selectedPack],
      quantity: 1,
      image: book.image,
    });
  };

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
          <h1 className="font-bold text-slate-900">B2B Coloring Books</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Bulk Coloring Books for Resellers</h1>
            <p className="text-lg text-slate-600 mb-6">
              Premium coloring books with tiered pricing for bulk orders
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`p-6 cursor-pointer transition-all border-2 ${
                  selectedPack === tier.id
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-200 hover:border-indigo-300"
                }`}
                onClick={() => setSelectedPack(tier.id as "single" | "10pack" | "50pack")}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-2">{tier.quantity}</p>
                <p className="text-slate-600 text-sm mb-3">{tier.description}</p>
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {tier.discount} Savings
                </div>
              </Card>
            ))}
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => {
              const prices = {
                single: book.single,
                "10pack": book.pack10,
                "50pack": book.pack50,
              };

              return (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition">
                  <div className="bg-gradient-to-br from-indigo-100 to-teal-100 h-40 flex items-center justify-center text-6xl">
                    {book.image}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-indigo-600 mb-2 uppercase">{book.category}</p>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{book.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{book.pages} pages</p>

                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Price ({selectedPack})</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        ${prices[selectedPack].toFixed(2)}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleAddToCart(book)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Benefits Section */}
          <div className="mt-16 bg-white rounded-lg border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Our B2B Program?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-semibold text-slate-900 mb-2">Wholesale Pricing</h4>
                <p className="text-slate-600">Save up to 50% on bulk orders</p>
              </div>
              <div>
                <div className="text-4xl mb-3">📦</div>
                <h4 className="font-semibold text-slate-900 mb-2">Fast Fulfillment</h4>
                <p className="text-slate-600">Quick turnaround on all orders</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-semibold text-slate-900 mb-2">Dedicated Support</h4>
                <p className="text-slate-600">Personal account manager for large orders</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Ready to order? Proceed to checkout</p>
            <Button
              onClick={() => setLocation("/checkout")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3"
            >
              Go to Checkout
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
