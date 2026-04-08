import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, ArrowLeft, Play } from "lucide-react";
import { useLocation } from "wouter";

interface PayhipProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  type: string;
  url: string;
}

const PAYHIP_PRODUCTS: PayhipProduct[] = [
  {
    id: "1",
    name: "Starter Course",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=500&fit=croph=500https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=500&fit=cropfit=crop",
    description: "Learn the fundamentals with our comprehensive beginner course. Perfect for getting started.",
    type: "Course",
    url: "https://payhip.com",
  },
  {
    id: "2",
    name: "Premium Membership",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    description: "Get exclusive access to all premium content, updates, and community support.",
    type: "Membership",
    url: "https://payhip.com",
  },
];

export default function Payhip() {
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
            <Zap className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-slate-900">Services & More</span>
          </div>
          <div className="w-20" />
        </div>
      </nav>

      {/* Header */}
      <section className="container py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Courses & Memberships
        </h1>
        <p className="text-lg text-slate-600">
          Unlock exclusive content, courses, and ongoing support with our premium offerings.
        </p>
      </section>

      {/* Products */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
          {PAYHIP_PRODUCTS.map(product => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-indigo-300"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden bg-slate-100 relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {product.name}
                  </h3>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                    {product.type}
                  </span>
                </div>
                <p className="text-slate-600 mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  {product.type === "Membership" && (
                    <span className="text-slate-600 text-sm ml-2">/month</span>
                  )}
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => window.open(product.url, '_blank')}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Get Access
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-amber-50 border-t border-amber-200 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Expert Content</h3>
                <p className="text-slate-600 text-sm">Learn from industry professionals</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Lifetime Updates</h3>
                <p className="text-slate-600 text-sm">Always get the latest content</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Community Support</h3>
                <p className="text-slate-600 text-sm">Connect with other learners</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Money-Back Guarantee</h3>
                <p className="text-slate-600 text-sm">30-day satisfaction guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
