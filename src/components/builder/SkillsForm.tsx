'use client';

import { Skill } from '@/types/resume';
import { useState } from 'react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddSkillCategory = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: '',
      items: [''],
    };
    onChange([...data, newSkill]);
    setExpandedId(newSkill.id);
  };

  const handleUpdateSkillCategory = (id: string, updates: Partial<Skill>) => {
    onChange(
      data.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    );
  };

  const handleRemoveSkillCategory = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const handleUpdateSkillItem = (skillId: string, itemIndex: number, value: string) => {
    const skill = data.find((s) => s.id === skillId);
    if (skill) {
      const newItems = [...skill.items];
      newItems[itemIndex] = value;
      handleUpdateSkillCategory(skillId, { items: newItems });
    }
  };

  const handleAddSkillItem = (skillId: string) => {
    const skill = data.find((s) => s.id === skillId);
    if (skill) {
      handleUpdateSkillCategory(skillId, { items: [...skill.items, ''] });
    }
  };

  const handleRemoveSkillItem = (skillId: string, itemIndex: number) => {
    const skill = data.find((s) => s.id === skillId);
    if (skill) {
      const newItems = skill.items.filter((_, i) => i !== itemIndex);
      handleUpdateSkillCategory(skillId, { items: newItems });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <button
          onClick={handleAddSkillCategory}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
        >
          + Add Skill Category
        </button>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-500 py-6 text-center">No skills added yet</p>
        ) : (
          data.map((skill) => (
            <div key={skill.id} className="border border-gray-300 rounded-lg">
              <button
                onClick={() => setExpandedId(expandedId === skill.id ? null : skill.id)}
                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {skill.category || 'New Category'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {skill.items.filter((i) => i).length} skill{skill.items.filter((i) => i).length !== 1 ? 's' : ''}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    expandedId === skill.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedId === skill.id && (
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-300 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => handleUpdateSkillCategory(skill.id, { category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., Programming Languages, Tools, etc."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Skills</label>
                      <button
                        onClick={() => handleAddSkillItem(skill.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        + Add Skill
                      </button>
                    </div>
                    <div className="space-y-2">
                      {skill.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateSkillItem(skill.id, idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                            placeholder="Enter a skill"
                          />
                          <button
                            onClick={() => handleRemoveSkillItem(skill.id, idx)}
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
                      onClick={() => handleRemoveSkillCategory(skill.id)}
                      className="px-4 py-2 text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Delete Category
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
