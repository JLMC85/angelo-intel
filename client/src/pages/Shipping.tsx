import { Button } from "@/components/ui/button";
import { ArrowLeft, Truck, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";

export default function Shipping() {
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
          <h1 className="font-bold text-slate-900">Shipping & Returns</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Shipping & Returns Policy</h1>

          <div className="space-y-8">
            {/* Shipping Section */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">Shipping Information</h2>
              </div>

              <div className="space-y-4 text-slate-600">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Shipping Times</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Domestic (USA):</strong> 5-14 business days</li>
                    <li><strong>International:</strong> 10-30 business days</li>
                    <li>Processing time: 1-3 business days before shipment</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Shipping Costs</h3>
                  <p>Shipping costs are calculated at checkout based on your location and product weight. Shipping fees are included in the product price for most items.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Tracking</h3>
                  <p>Once your order ships, you'll receive a tracking number via email. You can use this to monitor your package's progress.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">International Orders</h3>
                  <p>International customers may be responsible for customs duties and taxes. These are not included in the product price.</p>
                </div>
              </div>
            </div>

            {/* Returns Section */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <RotateCcw className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900">Returns & Refunds</h2>
              </div>

              <div className="space-y-4 text-slate-600">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Return Window</h3>
                  <p className="font-bold text-indigo-600 mb-2">14-Day Return Guarantee</p>
                  <p>All products can be returned within 14 days of purchase for a full refund, provided the item is unused and in original condition.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Return Shipping</h3>
                  <p><strong>Customer Responsibility:</strong> The customer is responsible for return shipping costs. These costs are not refunded.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Return Process</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Contact us at <a href="mailto:mcmanusjames85@lookout.com" className="text-indigo-600 hover:text-indigo-700">mcmanusjames85@lookout.com</a> with your order number</li>
                    <li>Receive return shipping instructions</li>
                    <li>Ship the item back to us (prepaid label not included)</li>
                    <li>Once received and inspected, we'll process your refund</li>
                    <li>Refunds typically appear within 5-10 business days</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Non-Returnable Items</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Digital products (coloring books, courses)</li>
                    <li>Items used or damaged by customer</li>
                    <li>Items without original packaging</li>
                    <li>Custom or personalized items</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Damaged or Defective Items</h3>
                  <p>If you receive a damaged or defective item, please contact us immediately with photos. We'll arrange a replacement or refund at no cost to you.</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-8">
              <h3 className="font-semibold text-slate-900 mb-2">Questions?</h3>
              <p className="text-slate-600 mb-4">
                If you have any questions about our shipping or returns policy, please don't hesitate to contact us.
              </p>
              <a href="mailto:mcmanusjames85@lookout.com" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                mcmanusjames85@lookout.com
              </a>
            </div>
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
