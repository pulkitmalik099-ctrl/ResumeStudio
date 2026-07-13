import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ResumeDataSchema } from '@/lib/resumeSchema';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
    }

    // Verify ownership
    if (resume.userId !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('GET /api/resumes/[id] error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, templateId, data } = await request.json();

    // Get existing resume to verify ownership
    const existingResume = await prisma.resume.findUnique({
      where: { id: params.id },
    });

    if (!existingResume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
    }

    if (existingResume.userId !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Validate resume data
    const validationResult = ResumeDataSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid resume data', errors: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.update({
      where: { id: params.id },
      data: {
        title: title || existingResume.title,
        templateId: templateId || existingResume.templateId,
        data: validationResult.data,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error('PUT /api/resumes/[id] error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: params.id },
    });

    if (!resume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
    }

    if (resume.userId !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.resume.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Resume deleted' });
  } catch (error) {
    console.error('DELETE /api/resumes/[id] error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
