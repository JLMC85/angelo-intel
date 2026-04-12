import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, BookOpen, Zap, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, setLocation] = useLocation();

  const sections = [
    {
      title: "Dropshipping",
      description: "Trending products, best-sellers, and fast-moving inventory",
      icon: TrendingUp,
      path: "/dropshipping",
      color: "from-indigo-500 to-indigo-600",
      badge: "100+ Products",
    },
    {
      title: "Digital Products",
      description: "Premium digital downloads and creative assets",
      icon: BookOpen,
      path: "/gumroad",
      color: "from-teal-500 to-teal-600",
      badge: "Gumroad",
    },
    {
      title: "Services & More",
      description: "Courses, memberships, and exclusive content",
      icon: Zap,
      path: "/payhip",
      color: "from-amber-500 to-amber-600",
      badge: "Payhip",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Angelo Intel
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#dropshipping" className="text-slate-600 hover:text-indigo-600 transition">
              Dropshipping
            </a>
            <a href="#gumroad" className="text-slate-600 hover:text-indigo-600 transition">
              Digital
            </a>
            <a href="#payhip" className="text-slate-600 hover:text-indigo-600 transition">
              Services
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Your Unified
                <span className="block bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                  Product Hub
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Discover trending dropshipping products, premium digital downloads, and exclusive services—all in one place. Curated for quality, optimized for value.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => setLocation("/dropshipping")}
              >
                Explore Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300"
                onClick={() => setLocation("/gumroad")}
              >
                Browse Digital
              </Button>
            </div>
          </div>

          {/* Hero Visual - Gradient Placeholder */}
          <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-teal-400 to-indigo-600 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Product Sections Preview */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need, organized for easy discovery
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card
                key={idx}
                className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-indigo-300"
                onClick={() => setLocation(section.path)}
              >
                <div className={`h-32 bg-gradient-to-br ${section.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition">
                    <Icon className="w-full h-full p-8 text-white/50" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/90 text-slate-900 text-xs font-semibold rounded-full">
                      {section.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {section.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-700 p-0 h-auto"
                  >
                    Explore →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900 text-white py-16 mt-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">100+</div>
              <p className="text-slate-300">Trending Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">2</div>
              <p className="text-slate-300">Digital Platforms</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-400 mb-2">∞</div>
              <p className="text-slate-300">Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-6 h-6 text-indigo-600" />
                <span className="font-bold text-slate-900">Angelo Intel</span>
              </div>
              <p className="text-sm text-slate-600">
                Your unified marketplace for trending products and digital services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#dropshipping" className="hover:text-indigo-600">Dropshipping</a></li>
                <li><a href="#gumroad" className="hover:text-indigo-600">Digital Products</a></li>
                <li><a href="#payhip" className="hover:text-indigo-600">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/about" className="hover:text-indigo-600">About</a></li>
                <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
                <li><a href="/shipping" className="hover:text-indigo-600">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/privacy" className="hover:text-indigo-600">Privacy</a></li>
                <li><a href="/terms" className="hover:text-indigo-600">Terms</a></li>
                <li><a href="/contact" className="hover:text-indigo-600">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2026 Angelo Intel. All rights reserved. Fully automated. Zero overhead.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
