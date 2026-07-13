'use client';

import { ResumeTemplateProps } from '@/types/resume';

export function ExecutiveElite({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-12 font-serif text-gray-900 max-w-4xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.contact.fullName}</h1>
        <div className="text-sm text-gray-600 space-x-3">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>•</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span>•</span>}
          {data.contact.location && <span>{data.contact.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Executive Profile</h2>
          <p className="text-sm leading-relaxed text-gray-700 italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Professional Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className={idx !== data.experience.length - 1 ? 'pb-4 border-b border-gray-200' : ''}>
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-sm">{exp.position}</p>
                  <p className="text-xs text-gray-600">{exp.startDate} – {exp.endDate || 'Present'}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-sm mt-2 ml-4 space-y-1">
                    {exp.achievements.filter(a => a).map((achievement, idx) => (
                      <li key={idx} className="list-disc text-gray-700">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className={idx !== data.education.length - 1 ? 'pb-3 border-b border-gray-200' : ''}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                  </div>
                  <p className="text-xs text-gray-600">{edu.startDate} – {edu.endDate}</p>
                </div>
                {edu.details && <p className="text-sm text-gray-700 mt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Core Competencies</h2>
          <div className="space-y-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-semibold text-gray-900">{skill.category}:</span>
                <span className="text-gray-700 ml-2">{skill.items.filter(i => i).join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
