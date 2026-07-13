'use client';

import { ResumeTemplateProps } from '@/types/resume';

export function ModernSidebar({ data, colorScheme = 'blue' }: ResumeTemplateProps) {
  const colors = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
    gray: 'bg-gray-700',
  };

  const accentColor = colors[colorScheme as keyof typeof colors] || colors.blue;

  return (
    <div className="bg-white max-w-4xl mx-auto flex">
      {/* Sidebar */}
      <div className={`${accentColor} text-white p-8 w-1/3`}>
        {/* Name */}
        <h1 className="text-3xl font-bold mb-1">{data.contact.fullName}</h1>
        <p className="text-sm text-blue-100 mb-6 pb-6 border-b border-blue-500">Professional Resume</p>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Contact</h3>
          <div className="text-sm space-y-1">
            {data.contact.email && <p>{data.contact.email}</p>}
            {data.contact.phone && <p>{data.contact.phone}</p>}
            {data.contact.location && <p>{data.contact.location}</p>}
            {data.contact.website && <p>{data.contact.website}</p>}
            {data.contact.linkedin && <p>{data.contact.linkedin}</p>}
            {data.contact.github && <p>{data.contact.github}</p>}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Skills</h3>
            <div className="space-y-3 text-sm">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="font-semibold mb-1">{skill.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.filter(i => i).map((item, idx) => (
                      <span key={idx} className="bg-blue-500 bg-opacity-40 px-2 py-1 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-8 w-2/3">
        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2 pb-2 border-b-2 border-gray-300">About</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm">{exp.position}</p>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="text-xs mt-2 ml-4 space-y-1">
                      {exp.achievements.filter(a => a).map((achievement, idx) => (
                        <li key={idx} className="list-disc text-gray-600">{achievement}</li>
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
          <div>
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm">{edu.degree}</p>
                      <p className="text-sm text-gray-600">{edu.school} • {edu.field}</p>
                    </div>
                    <p className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</p>
                  </div>
                  {edu.details && <p className="text-sm text-gray-700 mt-1">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
