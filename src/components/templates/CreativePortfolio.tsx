'use client';

import { ResumeTemplateProps } from '@/types/resume';

export function CreativePortfolio({ data, colorScheme = 'blue' }: ResumeTemplateProps) {
  const colors = {
    blue: { bg: 'bg-blue-500', accent: 'text-blue-500', border: 'border-blue-500' },
    purple: { bg: 'bg-purple-500', accent: 'text-purple-500', border: 'border-purple-500' },
    green: { bg: 'bg-green-500', accent: 'text-green-500', border: 'border-green-500' },
    pink: { bg: 'bg-pink-500', accent: 'text-pink-500', border: 'border-pink-500' },
  };

  const color = colors[colorScheme as keyof typeof colors] || colors.blue;

  return (
    <div className="bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className={`${color.bg} text-white p-8 mb-8`}>
        <h1 className="text-4xl font-bold mb-2">{data.contact.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.contact.email && <span>✉ {data.contact.email}</span>}
          {data.contact.phone && <span>📱 {data.contact.phone}</span>}
          {data.contact.location && <span>📍 {data.contact.location}</span>}
        </div>
        {(data.contact.website || data.contact.linkedin || data.contact.github) && (
          <div className="flex flex-wrap gap-4 text-sm mt-3">
            {data.contact.website && <span>🌐 {data.contact.website}</span>}
            {data.contact.linkedin && <span>💼 {data.contact.linkedin}</span>}
            {data.contact.github && <span>💻 {data.contact.github}</span>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-8 px-8 pb-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${color.accent} mb-3`}>About Me</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${color.accent} mb-4`}>Experience</h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id} className={`border-l-4 ${color.border} pl-4`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{exp.position}</p>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 font-semibold">
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="text-sm mt-2 space-y-1">
                        {exp.achievements.filter(a => a).map((achievement, idx) => (
                          <li key={idx} className="text-gray-700">
                            → {achievement}
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
              <h2 className={`text-2xl font-bold ${color.accent} mb-4`}>Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className={`border-l-4 ${color.border} pl-4`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.school} • {edu.field}</p>
                      </div>
                      <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    {edu.details && <p className="text-sm text-gray-700 mt-1">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Skills & Projects */}
        <div>
          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold ${color.accent} mb-3`}>Skills</h2>
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <p className="text-sm font-semibold text-gray-900 mb-2">{skill.category}</p>
                    <div className="space-y-1">
                      {skill.items.filter(i => i).map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className={`text-xl font-bold ${color.accent} mb-3`}>Featured Work</h2>
              <div className="space-y-4">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <p className="text-sm font-semibold text-gray-900">{project.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                    {project.technologies && (
                      <p className="text-xs text-gray-600 mt-1">Tech: {project.technologies}</p>
                    )}
                    {project.link && (
                      <p className="text-xs text-gray-600 mt-1">🔗 {project.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
