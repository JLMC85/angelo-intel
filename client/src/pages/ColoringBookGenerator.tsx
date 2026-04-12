import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Download } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function ColoringBookGenerator() {
  const [, setLocation] = useLocation();
  const [selectedTheme, setSelectedTheme] = useState("inspirational");
  const [pageCount, setPageCount] = useState(25);
  const [isGenerating, setIsGenerating] = useState(false);

  const themes = [
    {
      id: "inspirational",
      name: "Inspirational Quotes",
      description: "Uplifting messages and motivational quotes",
      icon: "✨",
    },
    {
      id: "affirmations",
      name: "Daily Affirmations",
      description: "Positive affirmations for self-growth",
      icon: "💪",
    },
    {
      id: "educational",
      name: "Educational",
      description: "Learning-focused content and facts",
      icon: "📚",
    },
    {
      id: "poetry",
      name: "Poetry & Verse",
      description: "Beautiful poems and literary passages",
      icon: "📖",
    },
    {
      id: "journaling",
      name: "Journaling Prompts",
      description: "Guided prompts for self-reflection",
      icon: "✍️",
    },
    {
      id: "mindfulness",
      name: "Mindfulness",
      description: "Meditation and wellness content",
      icon: "🧘",
    },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Generated ${pageCount}-page coloring book with ${selectedTheme} theme!`);
    }, 2000);
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
          <h1 className="font-bold text-slate-900">AI Coloring Book Generator</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <h1 className="text-4xl font-bold text-slate-900">Create Your Custom Coloring Book</h1>
            </div>
            <p className="text-lg text-slate-600">
              Design a personalized coloring book with AI-generated content tailored to your theme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Theme Selection */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Your Theme</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {themes.map((theme) => (
                  <Card
                    key={theme.id}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      selectedTheme === theme.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:border-indigo-300"
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div className="text-3xl mb-2">{theme.icon}</div>
                    <h3 className="font-semibold text-slate-900 mb-1">{theme.name}</h3>
                    <p className="text-sm text-slate-600">{theme.description}</p>
                  </Card>
                ))}
              </div>

              {/* Page Count Selection */}
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Number of Pages</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={pageCount}
                      onChange={(e) => setPageCount(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-indigo-600 w-16 text-right">{pageCount}</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Choose between 10-100 pages. More pages = more detailed content
                  </p>
                </div>
              </div>
            </div>

            {/* Preview & Price */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold text-slate-900 mb-4">Preview</h3>
                
                <div className="bg-gradient-to-br from-indigo-100 to-teal-100 rounded-lg p-8 mb-6 text-center min-h-64 flex flex-col items-center justify-center">
                  <Sparkles className="w-12 h-12 text-indigo-600 mb-2" />
                  <p className="text-slate-600 text-sm">
                    {pageCount}-page {themes.find(t => t.id === selectedTheme)?.name}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Price</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      ${pageCount <= 25 ? "7.99" : pageCount <= 50 ? "9.99" : "14.99"}
                    </p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Book
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isGenerating}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Preview PDF
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What You Get</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-2">🎨</div>
                <h4 className="font-semibold text-slate-900 mb-2">Custom Designs</h4>
                <p className="text-slate-600 text-sm">AI-generated unique coloring pages based on your theme</p>
              </div>
              <div>
                <div className="text-4xl mb-2">📝</div>
                <h4 className="font-semibold text-slate-900 mb-2">Themed Content</h4>
                <p className="text-slate-600 text-sm">Inspirational quotes, affirmations, or educational content</p>
              </div>
              <div>
                <div className="text-4xl mb-2">📥</div>
                <h4 className="font-semibold text-slate-900 mb-2">Instant Download</h4>
                <p className="text-slate-600 text-sm">High-quality PDF ready to print or color digitally</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
