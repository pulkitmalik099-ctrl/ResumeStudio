'use client';

import { ResumeTemplateProps } from '@/types/resume';

export function MinimalistATS({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11pt' }}>
      <div className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold">{data.contact.fullName}</h1>
        <div className="flex gap-3 text-xs mt-1">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span>{data.contact.location}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase mb-2">Summary</h2>
          <p className="text-xs leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase mb-2">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-2 text-xs">
              <div className="flex justify-between">
                <span className="font-bold">{exp.position} - {exp.company}</span>
                <span>{exp.startDate} to {exp.endDate || 'Present'}</span>
              </div>
              <p className="leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase mb-2">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="text-xs mb-1">
              <div className="flex justify-between">
                <span className="font-bold">{edu.degree} in {edu.field}</span>
                <span>{edu.startDate} to {edu.endDate}</span>
              </div>
              <p>{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="text-xs">
          <h2 className="text-xs font-bold uppercase mb-2">Skills</h2>
          {data.skills.map((skill) => (
            <div key={skill.id} className="mb-1">
              <span className="font-bold">{skill.category}:</span> {skill.items.filter(i => i).join(', ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
