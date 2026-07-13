import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { htmlToPdf } from '@/lib/pdf';
import { getTemplateComponent } from '@/components/templates';
import { renderToStaticMarkup } from 'react-dom/server';
import { rateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: 10 exports per minute per user
    const limitResult = rateLimit(session.user.id, 10, 60000);
    if (!limitResult.success) {
      return createRateLimitResponse(
        limitResult.retryAfter || 60,
        'Too many export requests. Please wait before trying again.'
      );
    }

    const { resumeId } = await request.json();

    if (!resumeId) {
      return NextResponse.json(
        { message: 'resumeId is required' },
        { status: 400 }
      );
    }

    // Get resume from database
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      return NextResponse.json(
        { message: 'Resume not found' },
        { status: 404 }
      );
    }

    // Verify ownership
    if (resume.userId !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Get template component
    const TemplateComponent = getTemplateComponent(resume.templateId);
    if (!TemplateComponent) {
      return NextResponse.json(
        { message: 'Template not found' },
        { status: 404 }
      );
    }

    // Render template to HTML
    const html = renderToStaticMarkup(
      TemplateComponent({
        data: resume.data as any,
      })
    );

    // Wrap in proper HTML document
    const htmlDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resume.title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              * { margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    // Convert to PDF
    const pdfBuffer = await htmlToPdf(htmlDocument);

    // Return PDF file
    const filename = `${resume.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return NextResponse.json(
      { message: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
