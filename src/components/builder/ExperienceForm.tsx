'use client';

import { Experience } from '@/types/resume';
import { useState } from 'react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: 'Present',
      description: '',
      achievements: [],
    };
    onChange([...data, newExperience]);
    setExpandedId(newExperience.id);
  };

  const handleUpdateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const handleRemoveExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const handleAddAchievement = (id: string) => {
    const exp = data.find((e) => e.id === id);
    if (exp) {
      handleUpdateExperience(id, {
        achievements: [...(exp.achievements || []), ''],
      });
    }
  };

  const handleUpdateAchievement = (id: string, index: number, value: string) => {
    const exp = data.find((e) => e.id === id);
    if (exp && exp.achievements) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      handleUpdateExperience(id, { achievements: newAchievements });
    }
  };

  const handleRemoveAchievement = (id: string, index: number) => {
    const exp = data.find((e) => e.id === id);
    if (exp && exp.achievements) {
      handleUpdateExperience(id, {
        achievements: exp.achievements.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <button
          onClick={handleAddExperience}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          + Add Position
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-500 py-6 text-center">No work experience added yet</p>
        ) : (
          data.map((exp) => (
            <div key={exp.id} className="border border-gray-300 rounded-lg">
              <button
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{exp.position || 'New Position'}</p>
                  <p className="text-sm text-gray-600">{exp.company || 'Company'}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedId === exp.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === exp.id && (
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-300 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleUpdateExperience(exp.id, { position: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
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
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(exp.id, { startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="2020-01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date (YYYY-MM or "Present")
                      </label>
                      <input
                        type="text"
                        value={exp.endDate || ''}
                        onChange={(e) => handleUpdateExperience(exp.id, { endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Present"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description / Responsibilities
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      rows={3}
                      placeholder="Describe your main responsibilities..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Key Achievements
                      </label>
                      <button
                        onClick={() => handleAddAchievement(exp.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {exp.achievements?.map((achievement, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => handleUpdateAchievement(exp.id, idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                            placeholder="Achievement or accomplishment..."
                          />
                          <button
                            onClick={() => handleRemoveAchievement(exp.id, idx)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-300">
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
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
