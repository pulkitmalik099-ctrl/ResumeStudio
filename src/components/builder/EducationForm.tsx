'use client';

import { Education } from '@/types/resume';
import { useState } from 'react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onChange([...data, newEducation]);
    setExpandedId(newEducation.id);
  };

  const handleUpdateEducation = (id: string, updates: Partial<Education>) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu))
    );
  };

  const handleRemoveEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={handleAddEducation}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          + Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-500 py-6 text-center">No education added yet</p>
        ) : (
          data.map((edu) => (
            <div key={edu.id} className="border border-gray-300 rounded-lg">
              <button
                onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{edu.degree || 'Degree'}</p>
                  <p className="text-sm text-gray-600">{edu.school || 'School'}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedId === edu.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === edu.id && (
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-300 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School / University
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleUpdateEducation(edu.id, { school: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="University of California"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleUpdateEducation(edu.id, { field: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Computer Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date (YYYY-MM)
                      </label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => handleUpdateEducation(edu.id, { startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="2018-09"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date (YYYY-MM)
                      </label>
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        onChange={(e) => handleUpdateEducation(edu.id, { endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="2022-05"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Details (GPA, Honors, etc.)
                    </label>
                    <input
                      type="text"
                      value={edu.details || ''}
                      onChange={(e) => handleUpdateEducation(edu.id, { details: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Summa Cum Laude, GPA: 3.8"
                    />
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-300">
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
