'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Resume {
  id: string;
  title: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      loadResumes();
    }
  }, [status]);

  const loadResumes = async () => {
    try {
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const data = await res.json();
        setResumes(data);
      }
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResumes(resumes.filter((r) => r.id !== id));
      } else {
        alert('Failed to delete resume');
      }
    } catch (error) {
      alert('Failed to delete resume');
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: string, title: string) => {
    try {
      const resumeRes = await fetch(`/api/resumes/${id}`);
      if (!resumeRes.ok) throw new Error('Failed to load resume');

      const resume = await resumeRes.json();
      const newTitle = `${title} (Copy)`;

      const createRes = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          templateId: resume.templateId,
          data: resume.data,
        }),
      });

      if (createRes.ok) {
        const newResume = await createRes.json();
        setResumes([newResume, ...resumes]);
        alert('Resume duplicated successfully!');
      } else {
        alert('Failed to duplicate resume');
      }
    } catch (error) {
      alert('Failed to duplicate resume');
      console.error(error);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: id }),
      });

      if (!res.ok) throw new Error('Failed to export');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const resume = resumes.find((r) => r.id === id);
      a.download = `${resume?.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to download resume');
      console.error(error);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Resume Generator</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {session?.user?.name || session?.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Resumes</h2>
            <p className="text-gray-600 mt-2">
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <Link
            href="/templates"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Resume
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume by choosing a template</p>
            <Link
              href="/templates"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Choose a Template
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resume.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Template: <span className="font-semibold capitalize">{resume.templateId.replace(/-/g, ' ')}</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => router.push(`/builder?resume-id=${resume.id}`)}
                      className="w-full py-2 px-4 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDownload(resume.id)}
                      className="w-full py-2 px-4 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Download PDF
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDuplicate(resume.id, resume.title)}
                        className="py-2 px-3 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        Duplicate
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        disabled={deletingId === resume.id}
                        className="py-2 px-3 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 transition-colors font-medium disabled:opacity-50"
                      >
                        {deletingId === resume.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">20 Templates</h3>
            <p className="text-gray-600 text-sm">Choose from professional designs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-2">💾</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Auto Save</h3>
            <p className="text-gray-600 text-sm">Your progress is saved automatically</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-2">📥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download PDF</h3>
            <p className="text-gray-600 text-sm">Export your resume anytime</p>
          </div>
        </div>
      </main>
    </div>
  );
}
