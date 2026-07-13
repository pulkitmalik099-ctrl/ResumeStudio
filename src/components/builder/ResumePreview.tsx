'use client';

import { ResumeData } from '@/types/resume';
import { getTemplateComponent } from '@/components/templates';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
  colorScheme?: 'default' | 'blue' | 'gray' | 'green';
}

export function ResumePreview({ data, templateId, colorScheme = 'default' }: ResumePreviewProps) {
  const TemplateComponent = getTemplateComponent(templateId);

  if (!TemplateComponent) {
    return (
      <div className="bg-white rounded-lg p-8 text-center text-gray-500">
        <p>Template not found: {templateId}</p>
        <p className="text-sm mt-2">Using default template...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-white">
        <div className="overflow-y-auto" style={{ maxHeight: '800px' }}>
          <TemplateComponent data={data} colorScheme={colorScheme as any} />
        </div>
      </div>
    </div>
  );
}
