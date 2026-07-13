'use client';

import { ResumeTemplateProps } from '@/types/resume';

// Professional Clean - ATS
export function ProfessionalClean({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-10 max-w-4xl mx-auto font-sans">
      <div className="mb-6 pb-4 border-b-2 border-gray-400">
        <h1 className="text-2xl font-bold">{data.contact.fullName}</h1>
        <p className="text-gray-700 text-sm mt-2">
          {[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).join(' | ')}
        </p>
      </div>

      {data.summary && <div className="mb-6"><p className="text-sm text-gray-700">{data.summary}</p></div>}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between"><span className="font-bold">{exp.position}</span><span className="text-sm">{exp.startDate} - {exp.endDate}</span></div>
              <p className="text-sm text-gray-600">{exp.company}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between"><span className="font-bold">{edu.degree}</span><span className="text-sm">{edu.startDate} - {edu.endDate}</span></div>
              <p className="text-sm text-gray-600">{edu.school} • {edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase mb-2">Skills</h2>
          {data.skills.map((skill) => (
            <p key={skill.id} className="text-sm"><span className="font-bold">{skill.category}:</span> {skill.items.filter(i => i).join(', ')}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// Contemporary Split - Modern
export function ContemporarySplit({ data }: ResumeTemplateProps) {
  return (
    <div className="grid grid-cols-3 bg-white max-w-4xl mx-auto">
      <div className="bg-gray-100 p-8 col-span-1">
        <h1 className="text-2xl font-bold mb-6">{data.contact.fullName.split(' ')[0]}</h1>
        <div className="text-sm space-y-2 mb-6">
          <p className="break-all">{data.contact.email}</p>
          {data.contact.phone && <p>{data.contact.phone}</p>}
          {data.contact.location && <p>{data.contact.location}</p>}
        </div>
        {data.skills.length > 0 && (
          <div>
            <h3 className="font-bold text-sm mb-2">Skills</h3>
            {data.skills.map((skill) => (
              <div key={skill.id} className="mb-3 text-xs">
                <p className="font-bold">{skill.category}</p>
                {skill.items.filter(i => i).map((item, idx) => (
                  <p key={idx} className="text-gray-700">{item}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-2 p-8">
        {data.summary && <p className="text-sm mb-6 italic text-gray-700">{data.summary}</p>}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <p className="font-bold text-sm">{exp.position} @ {exp.company}</p>
                <p className="text-xs text-gray-500">{exp.startDate} – {exp.endDate || 'Present'}</p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mb-3">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="font-bold text-sm">{edu.degree} • {edu.field}</p>
                <p className="text-xs text-gray-500">{edu.school}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Timeline Modern
export function TimelineModern({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{data.contact.fullName}</h1>
        <p className="text-gray-600 text-sm mt-2">{[data.contact.email, data.contact.phone].filter(Boolean).join(' • ')}</p>
      </div>

      {data.summary && <div className="mb-8 text-center text-sm text-gray-700"><p>{data.summary}</p></div>}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        <div className="space-y-6 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
          {data.experience.map((exp) => (
            <div key={exp.id} className="pl-8">
              <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full mt-1" style={{ marginLeft: '-6px' }}></div>
              <p className="font-bold">{exp.position}</p>
              <p className="text-sm text-gray-600">{exp.company} • {exp.startDate} to {exp.endDate || 'Present'}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3 pb-3 border-b">
              <p className="font-bold">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-600">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <p className="font-bold text-sm">{skill.category}</p>
                <p className="text-sm text-gray-700">{skill.items.filter(i => i).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Corporate Formal - Executive
export function CorporateFormal({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-10 max-w-4xl mx-auto border-t-4 border-gray-800">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.contact.fullName}</h1>
        <div className="h-1 w-12 bg-gray-800 my-2"></div>
        <div className="text-sm text-gray-700">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).join(' | ')}</div>
      </div>

      {data.summary && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <p className="text-sm text-gray-700">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Career History</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3 pb-3 border-b border-gray-200">
              <p className="font-bold text-sm">{exp.position}</p>
              <p className="text-sm text-gray-600">{exp.company} ({exp.startDate} - {exp.endDate || 'Present'})</p>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase mb-3">Qualifications</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="text-sm mb-2">
              <p className="font-bold">{edu.degree}, {edu.field}</p>
              <p className="text-gray-600">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase mb-3">Expertise</h2>
          {data.skills.map((skill) => (
            <div key={skill.id} className="text-sm mb-1">
              <span className="font-bold">{skill.category}:</span> {skill.items.filter(i => i).join(', ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Leadership Bold - Executive
export function LeadershipBold({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white max-w-4xl mx-auto">
      <div className="bg-black text-white p-10 mb-8">
        <h1 className="text-4xl font-bold mb-2">{data.contact.fullName}</h1>
        <div className="space-x-3 text-sm">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).map((item, i) => (
          <span key={i}>{i > 0 && ' • '}{item}</span>
        ))}</div>
      </div>

      <div className="px-10">
        {data.summary && <div className="mb-8"><p className="text-sm leading-relaxed">{data.summary}</p></div>}

        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <p className="font-bold">{exp.position}</p>
                <p className="text-sm text-gray-700">{exp.company} | {exp.startDate} to {exp.endDate}</p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-black">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="font-bold text-sm">{edu.degree}, {edu.field}</p>
                <p className="text-sm text-gray-700">{edu.school}</p>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="pb-8">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-black">Key Skills</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="font-bold text-sm">{skill.category}</p>
                  <p className="text-xs text-gray-700">{skill.items.filter(i => i).join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
