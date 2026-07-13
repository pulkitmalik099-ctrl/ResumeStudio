'use client';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export function SummaryForm({ data, onChange }: SummaryFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>

      <p className="text-gray-600 text-sm">
        Write a brief summary (2-4 sentences) about your professional background and goals.
        This is optional but recommended.
      </p>

      <textarea
        value={data || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
        rows={5}
        placeholder="Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable applications and mentoring junior developers."
      />

      <p className="text-gray-500 text-sm">
        {data?.length || 0} characters
      </p>
    </div>
  );
}
