'use client';

import { ResumeTemplateProps } from '@/types/resume';

export function ClassicChronological({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 font-serif text-gray-900 max-w-4xl mx-auto" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{data.contact.fullName}</h1>
        <div className="text-sm text-gray-700 mt-2 flex flex-wrap gap-4">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>•</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span>•</span>}
          {data.contact.location && <span>{data.contact.location}</span>}
        </div>
        {(data.contact.website || data.contact.linkedin || data.contact.github) && (
          <div className="text-sm text-gray-700 mt-1 flex flex-wrap gap-4">
            {data.contact.website && <span>{data.contact.website}</span>}
            {data.contact.linkedin && <span>•</span>}
            {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
            {data.contact.github && <span>•</span>}
            {data.contact.github && <span>{data.contact.github}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm">{exp.position}</p>
                    <p className="text-sm text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-nowrap">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </p>
                </div>
                <p className="text-sm mt-1 leading-relaxed">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-sm mt-1 ml-4 space-y-1">
                    {exp.achievements.filter(a => a).map((achievement, idx) => (
                      <li key={idx} className="list-disc text-gray-700">{achievement}</li>
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
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-nowrap">{edu.startDate} – {edu.endDate}</p>
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
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2">Skills</h2>
          <div className="space-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-bold">{skill.category}:</span>
                <span className="text-gray-700"> {skill.items.filter(i => i).join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
