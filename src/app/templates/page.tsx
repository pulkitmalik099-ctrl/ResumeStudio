'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TEMPLATE_CATEGORIES = [
  { id: 'ats', name: 'ATS-Friendly', color: 'blue' },
  { id: 'modern', name: 'Modern', color: 'purple' },
  { id: 'executive', name: 'Executive', color: 'gray' },
  { id: 'creative', name: 'Creative', color: 'pink' },
  { id: 'technical', name: 'Technical', color: 'green' },
  { id: 'other', name: 'Other', color: 'indigo' },
];

const TEMPLATES = [
  { id: 'classic-chronological', name: 'Classic Chronological', category: 'ats' },
  { id: 'minimalist-ats', name: 'Minimalist ATS', category: 'ats' },
  { id: 'professional-clean', name: 'Professional Clean', category: 'ats' },
  { id: 'modern-sidebar', name: 'Modern Sidebar', category: 'modern' },
  { id: 'contemporary-split', name: 'Contemporary Split', category: 'modern' },
  { id: 'timeline-modern', name: 'Timeline Modern', category: 'modern' },
  { id: 'executive-elite', name: 'Executive Elite', category: 'executive' },
  { id: 'corporate-formal', name: 'Corporate Formal', category: 'executive' },
  { id: 'leadership-bold', name: 'Leadership Bold', category: 'executive' },
  { id: 'creative-portfolio', name: 'Creative Portfolio', category: 'creative' },
  { id: 'designer-showcase', name: 'Designer Showcase', category: 'creative' },
  { id: 'bold-color-block', name: 'Bold Color Block', category: 'creative' },
  { id: 'tech-minimal', name: 'Tech Minimal', category: 'technical' },
  { id: 'developer-grid', name: 'Developer Grid', category: 'technical' },
  { id: 'academic-cv', name: 'Academic CV', category: 'other' },
  { id: 'graduate-fresh', name: 'Graduate Fresh Start', category: 'other' },
  { id: 'internship-simple', name: 'Internship Simple', category: 'other' },
  { id: 'hybrid-skills-first', name: 'Hybrid Skills-First', category: 'other' },
  { id: 'one-page-compact', name: 'One-Page Compact', category: 'other' },
  { id: 'europass-style', name: 'Europass Style', category: 'other' },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTemplates = selectedCategory
    ? TEMPLATES.filter((t) => t.category === selectedCategory)
    : TEMPLATES;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-gray-900 hover:text-indigo-600">
            Resume Generator
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a Template</h1>
          <p className="text-gray-600">Select from 20 professional resume templates</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
            }`}
          >
            All Templates
          </button>
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Template Preview Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-sm text-gray-600">Template Preview</p>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Category: {TEMPLATE_CATEGORIES.find((c) => c.id === template.category)?.name}
                </p>

                <button
                  onClick={() => router.push(`/builder?template=${template.id}`)}
                  className="w-full py-2 px-4 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No templates found in this category</p>
          </div>
        )}
      </main>
    </div>
  );
}
