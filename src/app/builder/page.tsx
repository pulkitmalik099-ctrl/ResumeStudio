'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { ContactForm } from '@/components/builder/ContactForm';
import { SummaryForm } from '@/components/builder/SummaryForm';
import { ExperienceForm } from '@/components/builder/ExperienceForm';
import { EducationForm } from '@/components/builder/EducationForm';
import { SkillsForm } from '@/components/builder/SkillsForm';
import { ResumePreview } from '@/components/builder/ResumePreview';

const SECTIONS = [
  { id: 'contact', label: 'Contact Info', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
];

const DEFAULT_DATA: ResumeData = {
  contact: { fullName: '', email: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  customSections: [],
};

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState('contact');
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_DATA);
  const [saving, setSaving] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [templateId] = useState(searchParams.get('template') || 'classic-chronological');

  const { status: authStatus } = useSession();
  const resumeIdFromUrl = searchParams.get('resume-id');

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [authStatus, router]);

  // Load existing resume if ID is provided
  useEffect(() => {
    if (resumeIdFromUrl) {
      const loadResume = async () => {
        try {
          const res = await fetch(`/api/resumes/${resumeIdFromUrl}`);
          if (res.ok) {
            const resume = await res.json();
            setResumeTitle(resume.title);
            setResumeData(resume.data);
          }
        } catch (error) {
          console.error('Failed to load resume:', error);
        }
      };
      loadResume();
    }
  }, [resumeIdFromUrl]);

  const handleSaveResume = async () => {
    if (!session?.user?.id) return;

    setSaving(true);
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resumeTitle,
          templateId,
          data: resumeData,
        }),
      });

      if (!res.ok) throw new Error('Failed to save');

      const result = await res.json();
      alert('Resume saved successfully!');
      router.push(`/builder/${result.id}`);
    } catch (error) {
      alert('Failed to save resume');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (!resumeData.contact.fullName || !resumeData.contact.email) {
      alert('Please fill in at least Name and Email before downloading');
      return;
    }

    try {
      // If resume is not saved yet, save it first
      let resumeIdToExport = searchParams.get('resume-id');

      if (!resumeIdToExport) {
        setSaving(true);
        const saveRes = await fetch('/api/resumes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: resumeTitle,
            templateId,
            data: resumeData,
          }),
        });

        if (!saveRes.ok) throw new Error('Failed to save resume');
        const saved = await saveRes.json();
        resumeIdToExport = saved.id;
        setSaving(false);
      }

      // Download PDF
      const downloadRes = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: resumeIdToExport }),
      });

      if (!downloadRes.ok) throw new Error('Failed to export PDF');

      const blob = await downloadRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeTitle.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('Resume downloaded successfully!');
    } catch (error) {
      alert('Failed to download resume');
      console.error(error);
    }
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="text-2xl font-bold text-gray-900 border-b-2 border-transparent hover:border-gray-300 focus:border-indigo-500 outline-none px-2 py-1"
              placeholder="Resume Title"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Preview
            </button>
            <button
              onClick={handleSaveResume}
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase">Sections</h3>
              <nav className="space-y-2">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              {activeSection === 'contact' && (
                <ContactForm
                  data={resumeData.contact}
                  onChange={(contact) => setResumeData({ ...resumeData, contact })}
                />
              )}

              {activeSection === 'summary' && (
                <SummaryForm
                  data={resumeData.summary || ''}
                  onChange={(summary) => setResumeData({ ...resumeData, summary })}
                />
              )}

              {activeSection === 'experience' && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(experience) => setResumeData({ ...resumeData, experience })}
                />
              )}

              {activeSection === 'education' && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(education) => setResumeData({ ...resumeData, education })}
                />
              )}

              {activeSection === 'skills' && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(skills) => setResumeData({ ...resumeData, skills })}
                />
              )}
            </div>
          </div>

          {/* Live Preview Pane */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Live Preview</h3>
              <ResumePreview data={resumeData} templateId={templateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
