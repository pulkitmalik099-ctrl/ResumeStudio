'use client';

import { ResumeTemplateProps } from '@/types/resume';

// Designer Showcase - Creative
export function DesignerShowcase({ data, colorScheme = 'blue' }: ResumeTemplateProps) {
  return (
    <div className="bg-gray-900 text-white p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-2">{data.contact.fullName}</h1>
        <div className="flex gap-4 text-sm">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).map((item, i) => (
          <span key={i}>{i > 0 && ' • '}{item}</span>
        ))}</div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {data.summary && <div className="mb-8"><h2 className="text-xl font-bold mb-2">About</h2><p className="text-gray-300">{data.summary}</p></div>}

          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4 pb-4 border-b border-gray-700">
                  <p className="font-bold">{exp.position}</p>
                  <p className="text-sm text-gray-400">{exp.company}</p>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm mt-2 text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Skills</h3>
              {data.skills.map((skill) => (
                <div key={skill.id} className="mb-3">
                  <p className="text-sm font-bold mb-1">{skill.category}</p>
                  {skill.items.filter(i => i).map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-400">{item}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {data.education.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3">Education</h3>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-2 text-sm">
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-xs text-gray-400">{edu.school}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Bold Color Block - Creative
export function BoldColorBlock({ data, colorScheme = 'blue' }: ResumeTemplateProps) {
  const colors: Record<string, { block: string; text: string; bg: string }> = {
    blue: { block: 'bg-blue-600', text: 'text-blue-600', bg: 'bg-blue-50' },
    purple: { block: 'bg-purple-600', text: 'text-purple-600', bg: 'bg-purple-50' },
    green: { block: 'bg-green-600', text: 'text-green-600', bg: 'bg-green-50' },
  };
  const color = colors[colorScheme as keyof typeof colors] || colors.blue;

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`${color.block} text-white p-8 mb-8`}>
        <h1 className="text-4xl font-bold mb-3">{data.contact.fullName}</h1>
        <div className="space-x-4 text-sm">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).map((item, i) => (
          <span key={i}>{i > 0 && ' • '}{item}</span>
        ))}</div>
      </div>

      <div className="px-8">
        {data.summary && <p className="mb-6 text-gray-700">{data.summary}</p>}

        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-2xl font-bold ${color.text} mb-4`}>Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <p className="font-bold">{exp.position} at {exp.company}</p>
                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm mt-1 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && <div className="mb-8"><h2 className={`text-2xl font-bold ${color.text} mb-4`}>Education</h2>{data.education.map((edu) => (<div key={edu.id} className="mb-2"><p className="font-bold">{edu.degree}</p><p className="text-sm text-gray-600">{edu.school}</p></div>))}</div>}

        {data.skills.length > 0 && (
          <div>
            <h2 className={`text-2xl font-bold ${color.text} mb-4`}>Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className={`${color.bg} p-3 rounded`}>
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

// Tech Minimal - Technical
export function TechMinimal({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto font-mono text-sm">
      <pre className="mb-6">{`$ whoami
${data.contact.fullName}

$ contact
email: ${data.contact.email}
phone: ${data.contact.phone || 'N/A'}
location: ${data.contact.location || 'N/A'}
`}</pre>

      {data.summary && <pre className="mb-6">{`$ cat biography
${data.summary}`}</pre>}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <pre>{`$ ls -la experience/`}</pre>
          {data.experience.map((exp, idx) => (
            <pre key={exp.id}>{`${idx + 1}. ${exp.position} @ ${exp.company}
   ${exp.startDate} - ${exp.endDate || 'Present'}
   ${exp.description.substring(0, 60)}...`}</pre>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <pre>{`$ cat skills.txt
${data.skills.map((s) => `${s.category}: ${s.items.filter(i => i).join(', ')}`).join('\n')}`}</pre>
      )}
    </div>
  );
}

// Developer Grid - Technical
export function DeveloperGrid({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-gray-50 p-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 text-white p-6 rounded mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.contact.fullName}</h1>
        <div className="flex gap-4 text-sm font-mono">{[data.contact.email, data.contact.location].filter(Boolean).map((item, i) => (
          <span key={i}>{item}</span>
        ))}</div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="bg-white p-4 rounded mb-3">
                  <p className="font-bold">{exp.position}</p>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-xs text-gray-500 mt-1">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data.skills.length > 0 && (
            <div className="bg-white p-4 rounded mb-6">
              <h3 className="font-bold mb-3">Tech Stack</h3>
              {data.skills.map((skill) => (
                <div key={skill.id} className="mb-3">
                  <p className="text-xs font-bold text-gray-700">{skill.category}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skill.items.filter(i => i).map((item, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.education.length > 0 && (
            <div className="bg-white p-4 rounded">
              <h3 className="font-bold mb-3">Education</h3>
              {data.education.map((edu) => (
                <div key={edu.id} className="text-sm mb-2">
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Academic CV
export function AcademicCV({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-10 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{data.contact.fullName}</h1>
        <p className="text-gray-600">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).join(' • ')}</p>
      </div>

      {data.summary && <p className="mb-6 text-sm">{data.summary}</p>}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3 pb-3 border-b">
              <p className="font-bold">{edu.degree}, {edu.field}</p>
              <p className="text-sm text-gray-600">{edu.school} ({edu.startDate} - {edu.endDate})</p>
              {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
            </div>
          ))}
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3 pb-3 border-b">
              <p className="font-bold">{exp.position}, {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Graduate Fresh Start
export function GraduateFreshStart({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">{data.contact.fullName}</h1>
      <p className="text-gray-600 mb-6">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).join(' • ')}</p>

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold uppercase mb-3">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="font-bold">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-600">{edu.school} • Graduated {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold uppercase mb-3">Skills</h2>
          {data.skills.map((skill) => (
            <p key={skill.id} className="text-sm mb-1"><span className="font-bold">{skill.category}:</span> {skill.items.filter(i => i).join(', ')}</p>
          ))}
        </div>
      )}

      {data.experience.length > 0 && (
        <div>
          <h2 className="font-bold uppercase mb-3">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <p className="font-bold">{exp.position} - {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} to {exp.endDate}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Internship Simple
export function InternshipSimple({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-3xl mx-auto border-l-4 border-blue-500">
      <h1 className="text-2xl font-bold mb-4">{data.contact.fullName}</h1>
      <p className="text-sm text-gray-600 mb-6">{data.contact.email} | {data.contact.phone} | {data.contact.location}</p>

      {data.summary && <p className="mb-6 text-sm">{data.summary}</p>}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold mb-2">Education</h2>
          {data.education.map((edu) => (
            <p key={edu.id} className="text-sm">{edu.degree} • {edu.school}</p>
          ))}
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold mb-3">Internship Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="text-sm mb-3">
              <p className="font-bold">{exp.position} at {exp.company}</p>
              <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="font-bold mb-2">Skills</h2>
          {data.skills.map((skill) => (
            <p key={skill.id} className="text-sm">{skill.category}: {skill.items.filter(i => i).join(', ')}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// Hybrid Skills-First
export function HybridSkillsFirst({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{data.contact.fullName}</h1>

      {data.skills.length > 0 && (
        <div className="mb-8 bg-gray-50 p-6 rounded">
          <h2 className="font-bold text-lg mb-4">Core Competencies</h2>
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

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-lg mb-4">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4 pb-4 border-b">
              <p className="font-bold">{exp.position} • {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="font-bold text-lg mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="text-sm">
              <p className="font-bold">{edu.degree} in {edu.field} • {edu.school}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// One-Page Compact
export function OnePageCompact({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-6 max-w-3xl mx-auto text-xs leading-tight">
      <h1 className="text-lg font-bold">{data.contact.fullName}</h1>
      <p className="text-gray-600">{[data.contact.email, data.contact.phone, data.contact.location].filter(Boolean).join(' | ')}</p>

      {data.summary && <p className="my-2 text-gray-700">{data.summary.substring(0, 150)}...</p>}

      {data.experience.length > 0 && (
        <div className="my-2">
          <p className="font-bold">EXPERIENCE</p>
          {data.experience.map((exp) => (
            <p key={exp.id}><span className="font-bold">{exp.position}</span> | {exp.company} ({exp.startDate}-{exp.endDate}) — {exp.description.substring(0, 80)}</p>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="my-2">
          <p className="font-bold">EDUCATION</p>
          {data.education.map((edu) => (
            <p key={edu.id}><span className="font-bold">{edu.degree}</span> in {edu.field} — {edu.school}</p>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="my-2">
          <p className="font-bold">SKILLS: {data.skills.map(s => s.items.filter(i => i).join(', ')).join(' | ')}</p>
        </div>
      )}
    </div>
  );
}

// Europass Style
export function EuropassStyle({ data }: ResumeTemplateProps) {
  return (
    <div className="bg-white p-8 max-w-3xl mx-auto border border-gray-300">
      <table className="w-full">
        <tbody>
          <tr>
            <td colSpan={2} className="py-2 border-b border-blue-500">
              <h1 className="text-2xl font-bold text-blue-600">{data.contact.fullName}</h1>
            </td>
          </tr>
          <tr>
            <td className="w-1/3 bg-blue-100 p-3 align-top">
              <h3 className="font-bold text-sm mb-2">Contact information</h3>
              <p className="text-xs">{data.contact.email}</p>
              {data.contact.phone && <p className="text-xs">{data.contact.phone}</p>}
              {data.contact.location && <p className="text-xs">{data.contact.location}</p>}
            </td>
            <td className="p-3">
              {data.summary && <div className="text-sm"><h3 className="font-bold mb-1">Job applied for</h3><p>{data.summary.substring(0, 100)}</p></div>}
            </td>
          </tr>
        </tbody>
      </table>

      {data.experience.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold bg-blue-100 p-2 text-sm">WORK EXPERIENCE</h3>
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-2 border-b border-gray-300">
              <p className="text-sm font-bold">{exp.startDate} – {exp.endDate}</p>
              <p className="text-sm">{exp.position}, {exp.company}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
