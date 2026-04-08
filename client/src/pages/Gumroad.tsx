import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowLeft, Download } from "lucide-react";
import { useLocation } from "wouter";

interface GumroadProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  url: string;
}

const GUMROAD_PRODUCTS: GumroadProduct[] = [
  {
    id: "1",
    name: "Coloring Book",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&h=500&fit=cropfit=crop",
    description: "Beautiful hand-drawn coloring book with 50+ intricate designs. Perfect for relaxation and creativity.",
    url: "https://jameslee58.gumroad.com/l/bsyojr",
  },
  {
    id: "2",
    name: "Coloring Books Bundle",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&h=500&fit=cropfit=crop",
    description: "Complete collection of all coloring books. Get 5+ books at an amazing bundle price.",
    url: "https://jameslee58.gumroad.com/l/lhlky",
  },
];

export default function Gumroad() {
  const [, setLocation] = useLocation();

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
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-slate-900">Digital Products</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      {/* Header */}
      <section className="container py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Digital Downloads
        </h1>
        <p className="text-lg text-slate-600">
          Premium digital products delivered instantly. Download and enjoy immediately after purchase.
        </p>
      </section>

      {/* Products */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          {GUMROAD_PRODUCTS.map(product => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-indigo-300"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => window.open(product.url, '_blank')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-indigo-50 border-t border-indigo-200 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Choose Our Digital Products?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Download className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Instant Delivery</h3>
              <p className="text-slate-600 text-sm">
                Download immediately after purchase. No waiting, no shipping.
              </p>
            </div>
            <div>
              <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Premium Quality</h3>
              <p className="text-slate-600 text-sm">
                Professionally designed and carefully curated for the best experience.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 text-indigo-600 mb-3 text-2xl">∞</div>
              <h3 className="font-semibold text-slate-900 mb-2">Lifetime Access</h3>
              <p className="text-slate-600 text-sm">
                Once purchased, access your products forever. No expiration dates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
