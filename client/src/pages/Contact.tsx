import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Contact() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
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
          <h1 className="font-bold text-slate-900">Contact Us</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-600 mb-12">
            Have questions or feedback? We'd love to hear from you. Reach out using the form below or contact us directly.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <a href="mailto:mcmanusjames85@lookout.com" className="text-indigo-600 hover:text-indigo-700">
                      mcmanusjames85@lookout.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Business Owner</h3>
                    <p className="text-slate-600">James Lee McManus</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                <p className="text-slate-600">
                  We typically respond to inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-green-700 font-semibold">Thank you for your message!</p>
                  <p className="text-green-600 text-sm mt-2">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="Your message"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
