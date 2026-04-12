import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
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
          <h1 className="font-bold text-slate-900">Privacy Policy</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-600 mb-8">Last updated: April 2026</p>

          <div className="prose prose-slate max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600">
                Angelo Intel ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              <p className="text-slate-600 mb-3">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, shipping address, phone number, and payment information when you make a purchase.</li>
                <li><strong>Automatic Data:</strong> Browser type, IP address, pages visited, and time spent on pages.</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your experience on our website.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Use of Your Information</h2>
              <p className="text-slate-600 mb-3">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Process your transactions and send related information.</li>
                <li>Email you regarding your order or account.</li>
                <li>Improve our website and services.</li>
                <li>Respond to your inquiries, questions, and requests.</li>
                <li>Generate analytics to improve our marketing efforts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Disclosure of Your Information</h2>
              <p className="text-slate-600">
                We may share your information with third parties who perform services for us, including payment processors, shipping providers, and analytics providers. We do not sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Security of Your Information</h2>
              <p className="text-slate-600">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
              <p className="text-slate-600">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="text-slate-600 mt-3">
                <strong>Email:</strong> <a href="mailto:mcmanusjames85@lookout.com" className="text-indigo-600 hover:text-indigo-700">mcmanusjames85@lookout.com</a>
              </p>
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
