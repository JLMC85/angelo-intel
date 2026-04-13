import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
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
          <h1 className="font-bold text-slate-900">About Us</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">About Angelo Intel</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              Angelo Intel is your premier destination for trending, high-quality products and digital content. We're dedicated to bringing you the best-selling items from around the world, curated specifically for today's market demands.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-slate-600 mb-6">
              We believe in making quality products accessible to everyone. Our mission is to provide a seamless shopping experience with trending products, digital courses, and exclusive content—all in one place.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
              <li>100+ trending dropshipping products across multiple categories</li>
              <li>Premium digital products and educational content</li>
              <li>Exclusive courses and memberships</li>
              <li>Fast, reliable shipping worldwide</li>
              <li>14-day return guarantee on all products</li>
              <li>Secure Stripe payment processing</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why Choose Us?</h2>
            <p className="text-slate-600 mb-4">
              We're committed to quality, reliability, and customer satisfaction. Every product is carefully selected based on current market trends and customer demand. Our streamlined checkout process and secure payment system ensure a smooth shopping experience.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-4">
              Have questions? We'd love to hear from you! Reach out to us at{" "}
              <a href="mailto:McManusJamesLee@gmail.com" className="text-indigo-600 hover:text-indigo-700">
                McManusJamesLee@gmail.com
              </a>
            </p>
          </div>

          <Button
            onClick={() => setLocation("/")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </section>
    </div>
  );
}
